import { getComponentElement } from './getComponentElement'

export function render(Component: any, containerElement = document.body) {
  containerElement.appendChild(getComponentElement(Component))
}
