export function dispatchEvent(
  from: HTMLElement | Window,
  name: keyof HTMLElementEventMap | keyof WindowEventMap,
  init?: CustomEventInit & { custom?: boolean }
) {
  if (init?.custom) {
    from.dispatchEvent(new CustomEvent(name as string, init))
  } else {
    from.dispatchEvent(new Event(name as string, init))
  }
}
