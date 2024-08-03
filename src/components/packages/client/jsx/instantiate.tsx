export interface InstantiateOptions {
  children?: JSX.ComponentChildren
  attributes?: JSX.AllAttributes
}

export function instantiate(
  Component: JSX.Component,
  options?: InstantiateOptions
) {
  const children = options?.children
  const attributes = options?.attributes

  return (<Component {...attributes}>{children}</Component>)()
}
