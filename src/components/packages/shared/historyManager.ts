export interface HistoryManagerState {
  page: string
  data?: Record<string, unknown>
  timestamp?: number
}

export interface HistoryManagerChangeParameters {
  action: HistoryManagerChangeAction
  pathname: string
  searchParameters?: string | undefined
  hash?: string | undefined
  data?: Record<string, unknown>
}

export type HistoryManagerChangeAction = 'replace' | 'push' | 'none'

export interface HistoryManagerPopStateEvent extends PopStateEvent {
  state: HistoryManagerState | null
  previousState: HistoryManagerState | null
}

type PopStateHandler = (event: HistoryManagerPopStateEvent) => void

class HistoryManager {
  #previousStates: (HistoryManagerState | null)[]
  #popStateHandlers: PopStateHandler[]

  constructor() {
    history.scrollRestoration = 'manual'
    this.#previousStates = [history.state]
    this.#popStateHandlers = []
    this.#setupTracking()
  }

  public get size() {
    return this.#previousStates.length
  }

  #setupTracking() {
    window.addEventListener('popstate', this.#handlePopState.bind(this))
    this.#overrideHistoryMethods()
  }

  #overrideHistoryMethods() {
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = (
      state: HistoryManagerState | null,
      title: string,
      url?: string | null,
    ) => {
      this.#updateHistory(state)
      return originalPushState.call(history, state, title, url)
    }

    history.replaceState = (
      state: HistoryManagerState | null,
      title: string,
      url?: string | null,
    ) => {
      this.#updateHistory(state, true)
      return originalReplaceState.call(history, state, title, url)
    }
  }

  #updateHistory(
    state: HistoryManagerState | null,
    isReplace: boolean = false,
  ) {
    if (isReplace && this.#previousStates.length > 0) {
      this.#previousStates[this.#previousStates.length - 1] = state
    } else {
      this.#previousStates.push(state)
      if (this.#previousStates.length > 50) {
        this.#previousStates.shift()
      }
    }
  }

  #handlePopState(event: PopStateEvent) {
    const targetState = this.getPreviousState()
    const previousState = this.getCurrentState()

    if (targetState) {
      this.#previousStates[this.#previousStates.length - 2] = previousState
      this.#previousStates[this.#previousStates.length - 1] = targetState
    }

    this.#popStateHandlers.forEach((handler) => {
      handler({
        ...event,
        state: targetState,
        previousState: previousState,
      })
    })
  }

  #getPathname(url: string | URL) {
    if (typeof url === 'string') {
      return url
    } else {
      return url.pathname
    }
  }

  public getPreviousState(): HistoryManagerState | null {
    return this.#previousStates.length > 1
      ? this.#previousStates[this.#previousStates.length - 2]
      : null
  }

  public getCurrentState(): HistoryManagerState | null {
    return this.#previousStates.length > 0
      ? this.#previousStates[this.#previousStates.length - 1]
      : null
  }

  public addPopStateHandler(handler: PopStateHandler, unshift?: boolean) {
    if (unshift) {
      this.#popStateHandlers.unshift(handler)
    } else {
      this.#popStateHandlers.push(handler)
    }
  }

  public removePopStateHandler(handler: PopStateHandler) {
    const index = this.#popStateHandlers.indexOf(handler)
    if (index > -1) {
      this.#popStateHandlers.splice(index, 1)
    }
  }

  public updateCurrentStateData(data: Record<string, unknown>) {
    let state = this.getCurrentState()

    if (state) {
      state.data = {
        ...state.data,
        ...data,
      }
    }
  }

  public updatePreviousStateData(data: Record<string, unknown>) {
    let state = this.getPreviousState()

    if (state) {
      state.data = {
        ...state.data,
        ...data,
      }
    }
  }

  public pushState(page: string | URL, data?: Record<string, unknown>) {
    const state: HistoryManagerState = {
      page: this.#getPathname(page),
      data,
      timestamp: Date.now(),
    }

    history.pushState(state, '', page)
  }

  public replaceState(page: string | URL, data?: Record<string, unknown>) {
    const state: HistoryManagerState = {
      page: this.#getPathname(page),
      data,
      timestamp: Date.now(),
    }

    history.replaceState(state, '', page)
  }

  public back() {
    history.back()
  }

  public forward() {
    history.forward()
  }

  public go(delta: number) {
    history.go(delta)
  }

  // Для Morph. Убрать когда там будут URL
  public __change(parameters: HistoryManagerChangeParameters) {
    if (parameters.action === 'none') {
      return
    }

    const por = parameters?.searchParameters
    const hash = parameters.hash
      ? parameters.hash.startsWith('#')
        ? parameters.hash
        : '#' + parameters.hash
      : ''
    const searhParameters = por ? (por.startsWith('?') ? por : '?' + por) : ''
    const pathPlus = `${parameters.pathname}${searhParameters}${hash}`

    if (parameters.action === 'push') {
      this.pushState(pathPlus, parameters.data)
    } else if (parameters.action === 'replace') {
      this.replaceState(pathPlus, parameters.data)
    }
  }

  public debugHistory() {
    console.log('Current history state:')
    this.#previousStates.forEach((state, index) => {
      console.log(`[${index}]:`, state?.page)
    })
  }
}

export const historyManager = new HistoryManager()
