import { intersector } from '@packages/intersector'
import { ticker } from '@packages/ticker'

export interface SetIntervalOnIntersectionEntry {
  previous: number
  current: number
  progress: number
}

export type SetIntervalOnIntersectionCallback = (
  entry: SetIntervalOnIntersectionEntry,
) => void

export interface SetIntervalOnIntersectionOptions {
  restartCounter?: boolean
}

export function setIntervalOnIntersection(
  element: HTMLElement,
  delay: number,
  callback: SetIntervalOnIntersectionCallback,
  options?: SetIntervalOnIntersectionOptions,
) {
  let intervalId: ReturnType<typeof setInterval> | undefined
  let isIntersecting = false
  let current = 0
  let previous = 0

  let tickerUnsubsribe: Function | undefined

  const toggleInterval = () => {
    clearInterval(intervalId)
    tickerUnsubsribe?.()

    if (options?.restartCounter) {
      current = 0
    }

    if (isIntersecting) {
      callback({
        current,
        previous,
        progress: 0,
      })

      previous = current

      tickerUnsubsribe = restartTicker()

      intervalId = setInterval(() => {
        tickerUnsubsribe?.()

        current++

        callback({
          current,
          previous,
          progress: 0,
        })

        previous = current

        tickerUnsubsribe = restartTicker()
      }, delay)
    }
  }

  const restartTicker = () => {
    return ticker.subscribe((e) => {
      const progress = e.timeElapsedSinceSubscription / delay

      callback({
        current,
        previous,
        progress,
      })
    })
  }

  const intersectorUnsubscribe = intersector.subscribe(element, (e) => {
    isIntersecting = e.isIntersecting
    toggleInterval()
  })

  const destroy = () => {
    tickerUnsubsribe?.()
    intersectorUnsubscribe()
    clearInterval(intervalId)
  }

  const restart = (currentValue?: number, previousValue?: number) => {
    current = currentValue || 0

    if (previousValue) {
      previous = previousValue
    }

    toggleInterval()
  }

  return {
    destroy,
    restart,
  }
}
