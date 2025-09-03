import { Store } from '@packages/store'

export function filterChildren(children: JSX.Children) {
  const filtered: Array<string | Element | Store<any>> = []
  const arr = Array.isArray(children) ? children : [children]

  arr.forEach((child) => {
    if (child !== null && child !== undefined) {
      if (typeof child === 'number') {
        filtered.push(child.toString())
      } else if (Array.isArray(child)) {
        child.forEach((c) => {
          filtered.push(...filterChildren(c))
        })
      } else {
        filtered.push(child)
      }
    }
  })

  return filtered
}
