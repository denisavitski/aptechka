import { Damped, Tweened } from '@packages/animation'
import { onConnect, onDisconnect } from '../Component'
import { TickerAddOptions, TickerCallback, ticker } from '@packages/ticker'
import { ElementOrSelector } from '@packages/utils'
import { ElementConstructorRef } from '@packages/element-constructor'

export function createDamped(
  ...parameters: ConstructorParameters<typeof Damped>
) {
  const store = new Damped(...parameters)
  onDisconnect(store.close)
  return store
}

export function createTweened(
  ...parameters: ConstructorParameters<typeof Tweened>
) {
  const store = new Tweened(...parameters)
  onDisconnect(store.close)
  return store
}

export function onAnimationFrame(
  callback: TickerCallback,
  options?: Omit<TickerAddOptions, 'culling'> & {
    culling?: boolean | ElementOrSelector | ElementConstructorRef
  }
) {
  onConnect((e) => {
    let cullingElement: ElementOrSelector | undefined

    const culling = options?.culling

    if (culling === true) {
      cullingElement = e
    } else if (typeof culling === 'string' || culling instanceof Element) {
      cullingElement = culling as ElementOrSelector
    } else if (typeof culling === 'object') {
      cullingElement = culling.current
    }

    return ticker.subscribe(callback, {
      culling: cullingElement,
      maxFPS: options?.maxFPS,
      order: options?.order,
    })
  })
}
