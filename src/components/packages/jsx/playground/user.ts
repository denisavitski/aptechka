import { Store } from '@packages/store'

export interface User {
  name: string
}

export const user = new Store<User | null>(null)
