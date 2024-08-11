export function dispatchEvent<From extends HTMLElement | Window>(
  from: From,
  name: From extends HTMLElement ? keyof HTMLElementEventMap : WindowEventMap,
  init?: CustomEventInit & { custom?: boolean }
) {
  if (init?.custom) {
    from.dispatchEvent(new CustomEvent(name as string, init))
  } else {
    from.dispatchEvent(new Event(name as string, init))
  }
}
