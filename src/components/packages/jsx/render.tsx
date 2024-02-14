import { ElementOrSelector, getElement } from '@packages/utils'

export function render(
  elementOrSelector: ElementOrSelector,
  App: JSX.Component,
  props?: object
) {
  const element = getElement(elementOrSelector)

  const jsxElement = <App {...props}></App>

  if (element && jsxElement instanceof Node) {
    element.appendChild(jsxElement)
  }
}
