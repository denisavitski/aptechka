import { CSSProperty } from '@packages/css-property'
import { activeStores } from '@packages/store'
import { ticker } from '@packages/ticker'

export function devMode() {
  ticker.subscribe(() => {
    for (let index = 0; index < activeStores.current.length; index++) {
      const store = activeStores.current[index]

      if (store instanceof CSSProperty) {
        store.check()
      }
    }
  })
}

export function getCreationSource(index = 4) {
  try {
    throw new Error()
  } catch (e: any) {
    const stack = e.stack.split('\n')
    const path = stack[index]?.trim()
    // console.log(stack)
    return 'http' + path?.split('?')[0].split('http')[1]
  }
}
