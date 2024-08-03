import { Store } from '@packages/client/store'

export interface User {
  name: string
}

export const user = new Store<User | null>(null)
