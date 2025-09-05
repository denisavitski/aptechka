import { hydrate, indexMap, render } from 'aptechka/jsx'

export default (element: HTMLElement) => {
  return async (
    Component: any,
    props: Record<string, any>,
    { default: children, ...slotted }: Record<string, any>,
    { client }: Record<string, string>,
  ) => {
    indexMap.clear()

    if (client === 'only') {
      const container = document.createElement('div')

      render(
        container,
        Component,
        {
          ...props,
        },
        children,
      )

      if (container.firstElementChild) {
        element.appendChild(container.firstElementChild!)
      }
    } else {
      hydrate(Component, props, children)
    }
  }
}
