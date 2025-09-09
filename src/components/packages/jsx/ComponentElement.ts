import { intersector } from '@packages/intersector'

export type ComponentConnectCallback = (
  element: HTMLElement,
) => void | ComponentDisconnectCallback
export type ComponentDisconnectCallback = (element: HTMLElement) => void

export const activeComponent: { current: ComponentElement } = { current: null! }

export const componentElementLoadingTypes = [
  'idle',
  'load',
  'visible',
  'constructor',
  'connect',
] as const

export type ComponentElementLoadingType =
  (typeof componentElementLoadingTypes)[number]

export class ComponentElement extends HTMLElement {
  public __props__: any
  public __innerHTML__: any
  #loadCallback?: Function
  #connectCallbacks: Array<ComponentConnectCallback> = []
  #disconnectCallbacks: Array<ComponentDisconnectCallback> = []

  #loadingType: ComponentElementLoadingType = 'constructor'
  #idleId: ReturnType<typeof requestIdleCallback> | undefined

  constructor() {
    super()

    activeComponent.current = this
  }

  public addLoadCallback(callback: Function) {
    if (
      this.hasAttribute('loading') &&
      componentElementLoadingTypes.includes(
        this.getAttribute('loading') as ComponentElementLoadingType,
      )
    ) {
      this.#loadingType = this.getAttribute(
        'loading',
      ) as ComponentElementLoadingType
    } else {
      this.#loadingType = 'constructor'
    }

    this.#loadCallback = callback

    if (this.#loadingType === 'constructor') {
      this.#loadCallback()
    }
  }

  public addConnectCallback(callback: ComponentConnectCallback) {
    this.#connectCallbacks.push(callback)
  }

  public addDisconnectCallback(callback: ComponentDisconnectCallback) {
    this.#disconnectCallbacks.push(callback)
  }

  protected connectedCallback() {
    const windowLoadSetup = () => {
      if (document.readyState === 'complete') {
        this.#windowLoadListener()
      } else {
        window.addEventListener('load', this.#windowLoadListener)
      }
    }

    if (
      this.#loadingType === 'connect' ||
      this.#loadingType === 'constructor'
    ) {
      this.#connect()
    } else if (this.#loadingType === 'load') {
      windowLoadSetup()
    } else if (this.#loadingType === 'idle') {
      if (window.requestIdleCallback) {
        this.#idleId = window.requestIdleCallback(this.#idleListener)
      } else {
        windowLoadSetup()
      }
    } else if (this.#loadingType === 'visible') {
      intersector.subscribe(this, this.#intersectionListener)
    }

    if (activeComponent.current === this) {
      activeComponent.current = null!
    }
  }

  protected disconnectedCallback() {
    this.#disconnectCallbacks.forEach((callback) => {
      callback(this)
    })

    this.#connectCallbacks = []
    this.#disconnectCallbacks = []

    if (activeComponent.current === this) {
      activeComponent.current = null!
    }

    window.removeEventListener('load', this.#windowLoadListener)

    if (window.cancelIdleCallback && this.#idleId) {
      window.cancelIdleCallback(this.#idleId)
    }

    intersector.unsubscribe(this.#intersectionListener)
  }

  #windowLoadListener = () => {
    window.removeEventListener('load', this.#windowLoadListener)

    if (this.#loadingType === 'load') {
      this.#connect()
    }
  }

  #idleListener = () => {
    this.#idleId = undefined

    if (this.#loadingType === 'idle') {
      this.#connect()
    }
  }

  #intersectionListener = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      intersector.unsubscribe(this.#intersectionListener)

      if (this.#loadingType === 'visible') {
        this.#connect()
      }
    }
  }

  #connect() {
    activeComponent.current = this

    if (this.#loadingType !== 'constructor') {
      this.#loadCallback?.()
    }

    this.#connectCallbacks.forEach((callback) => {
      const unsub = callback(this)

      if (unsub) {
        this.#disconnectCallbacks.push(unsub)
      }
    })

    if (activeComponent.current === this) {
      activeComponent.current = null!
    }
  }
}
