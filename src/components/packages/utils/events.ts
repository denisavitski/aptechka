export function dispatchEvent<
  K extends keyof HTMLElementEventMap | keyof WindowEventMap
>(
  from: HTMLElement | Window,
  name: K,
  init?: CustomEventInit<
    K extends keyof HTMLElementEventMap
      ? HTMLElementEventMap[K] extends CustomEvent<any>
        ? HTMLElementEventMap[K]['detail']
        : unknown
      : K extends keyof WindowEventMap
      ? WindowEventMap[K] extends CustomEvent<any>
        ? WindowEventMap[K]['detail']
        : unknown
      : unknown
  > & { custom?: boolean }
) {
  if (init?.custom || init?.detail) {
    from.dispatchEvent(new CustomEvent(name as string, init))
  } else {
    from.dispatchEvent(new Event(name as string, init))
  }
}
