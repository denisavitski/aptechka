import { connector } from '@packages/connector'
import { div } from '@packages/element-constructor'
import { camelToKebab, isBrowser } from '@packages/utils'

export type ComponentWrapperCreateCallback = (rootNode: Node) => void
export type ComponentWrapperConnectCallback = (
  rootNode: Node
) => (() => void) | void
export type ComponentWrapperDisconnectCallback = (rootNode: Node) => void

export let currentComponentWrapper = null! as ComponentWrapper

export class ComponentWrapper {
  #functionName: string
  #rootNode: Node

  #createCallbacks: Set<ComponentWrapperCreateCallback> = new Set()
  #connectCallbacks: Set<ComponentWrapperConnectCallback> = new Set()
  #disconnectCallbacks: Set<ComponentWrapperDisconnectCallback> = new Set()

  constructor(functionName: string, jsxElementCallback: () => JSX.Element) {
    currentComponentWrapper = this

    this.#functionName = functionName

    const jsxElement = jsxElementCallback()

    if (
      !(jsxElement instanceof Node) ||
      jsxElement instanceof DocumentFragment
    ) {
      if (jsxElement == undefined) {
        this.#rootNode = document.createComment(
          camelToKebab(this.#functionName)
        )
      } else if (typeof jsxElement === 'object') {
        this.#rootNode = div({
          style: {
            display: 'contents',
          },
          children: jsxElement,
        }).rootElements[0]
      } else {
        this.#rootNode = document.createTextNode(jsxElement.toString())
      }
    } else {
      this.#rootNode = jsxElement
    }

    this.#createCallbacks.forEach((callback) => {
      callback(this.#rootNode)
    })

    if (isBrowser) {
      const unsubscribe = connector.subscribe(this.#rootNode, {
        connectCallback: () => {
          this.#connectCallbacks.forEach((callback) => {
            const disconnect = callback(this.#rootNode)

            if (disconnect) {
              this.addDisconnectCallback(disconnect)
            }
          })
        },
        disconnectCallback: () => {
          this.#disconnectCallbacks.forEach((callback) => {
            callback(this.#rootNode)
          })

          this.#connectCallbacks.clear()
          this.#disconnectCallbacks.clear()
          this.#createCallbacks.clear()

          unsubscribe()
        },
        maxWaitSec: 20,
      })
    }
  }

  public get rootNode() {
    return this.#rootNode
  }

  public addCreateCallback(callback: ComponentWrapperCreateCallback) {
    this.#createCallbacks.add(callback)
  }

  public addConnectCallback(callback: ComponentWrapperConnectCallback) {
    this.#connectCallbacks.add(callback)
  }

  public addDisconnectCallback(callback: ComponentWrapperDisconnectCallback) {
    this.#disconnectCallbacks.add(callback)
  }
}
