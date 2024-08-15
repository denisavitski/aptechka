import { Store } from '@packages/store/vanilla'
import { initializeStudio } from '..'

initializeStudio()

const store = new Store(1, { name: 'folder.nester-folder.file' })

store.subscribe(() => {})
