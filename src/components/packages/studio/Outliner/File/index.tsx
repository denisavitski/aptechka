import React, { memo } from 'react'
import { Store } from '@packages/store/vanilla'
import css from './index.module.css'
import { useStore } from '@packages/store/react'
import { activeStore } from '@packages/studio/store'

export interface FileProps {
  name: string
  path: string
  store: Store<any>
}

export const File: React.FC<FileProps> = memo(({ name, path, store }) => {
  const [_, setActiveStore] = useStore(activeStore)

  return (
    <div
      className={css.file}
      onClick={() => setActiveStore(store)}
    >
      <div>{name}</div>
    </div>
  )
})
