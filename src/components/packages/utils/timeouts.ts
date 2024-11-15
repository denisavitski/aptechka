import { intersector } from '@packages/intersector'

export type SetIntervalOnIntersectionCallback = (counter: number) => void

export interface SetIntervalOnIntersectionOptions {
  restartCounter?: boolean
}

export function setIntervalOnIntersection(
  element: HTMLElement,
  delay: number,
  callback: SetIntervalOnIntersectionCallback,
  options?: SetIntervalOnIntersectionOptions
) {
  let intervalId: ReturnType<typeof setInterval> | undefined
  let isIntersecting = false
  let counter = 0

  const toggleInterval = () => {
    clearInterval(intervalId)

    if (options?.restartCounter) {
      counter = 0
    }

    if (isIntersecting) {
      intervalId = setInterval(() => {
        callback(counter++)
      }, delay)
    }
  }

  const unsubsribe = intersector.subscribe(element, (e) => {
    isIntersecting = e.isIntersecting
    toggleInterval()
  })

  return () => {
    unsubsribe()
    clearInterval(intervalId)
  }
}
