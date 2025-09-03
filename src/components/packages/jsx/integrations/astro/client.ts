import { render } from '@packages/jsx/render'

export default (element: HTMLElement) => {
  return async (
    Component: any,
    props: Record<string, any>,
    { default: children, ...slotted }: Record<string, any>,
    { client }: Record<string, string>,
  ) => {
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
      element.replaceWith(container.firstElementChild!)
    }
  }
}
