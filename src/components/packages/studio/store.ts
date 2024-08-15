import { Store } from '@packages/store/vanilla'

export const activeStore = new Store<Store<any> | null>(null, {
  invisible: true,
})
