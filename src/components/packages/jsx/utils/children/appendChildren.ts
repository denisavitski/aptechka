import { Store } from '@packages/store'
import { subscribeToStore } from '../elementStoreSubscription'
import { filterChildren } from './filterChildren'
import { storeChildren } from './storeChildren'

export type Children = Array<
  Element | string | number | null | undefined | Store<any> | Array<Children>
>

export function appendChildren(element: Element, ...children: Children) {
  const filteredChildren = filterChildren(children)

  filteredChildren.forEach((child) => {
    if (child instanceof Store) {
      subscribeToStore(element, child, (e) => {
        storeChildren(element, child.id, e.current)
      })
    } else {
      element.append(child)
    }
  })
}
