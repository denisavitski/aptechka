import { instantiate } from './instantiate'

export function render(Component: any, containerElement = document.body) {
  containerElement.appendChild(instantiate(Component))
}
