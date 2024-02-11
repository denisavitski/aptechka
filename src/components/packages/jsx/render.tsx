import { ElementOrSelector, getElement } from '@packages/utils'

export function render(
  elementOrSelector: ElementOrSelector,
  App: JSX.Component
) {
  const element = getElement(elementOrSelector)

  const jsxElement = <App></App>

  if (element && jsxElement instanceof Node) {
    element.appendChild(jsxElement)
  }
}
