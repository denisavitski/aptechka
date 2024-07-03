import { InstantiateOptions, instantiate } from './instantiate'

export interface RenderOptions extends InstantiateOptions {
  containerElement?: HTMLElement
}

export function render(Component: JSX.Component, options?: RenderOptions) {
  const containerElement = options?.containerElement || document.body

  containerElement.appendChild(instantiate(Component, options))
}
