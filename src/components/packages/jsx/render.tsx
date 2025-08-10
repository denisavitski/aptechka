export function render(
  container: ParentNode,
  Component: JSX.Component,
  params?: object,
) {
  const element = <Component {...params}></Component>
  container.append(element)
  return element
}
