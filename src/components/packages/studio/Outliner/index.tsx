import React, { useEffect, useState } from 'react'
import { Store, activeStores } from '@packages/store/vanilla'
import css from './index.module.css'
import { Folder, FolderProps } from './Folder'

export const Outliner: React.FC = () => {
  const [stores, setStores] = useState<Array<Store<any>>>([])

  useEffect(() => {
    return activeStores.subscribe((e) => {
      setStores(e.current)
    })
  }, [])

  const folders: Array<FolderProps> = []

  stores.forEach((store) => {
    if (store.name) {
      const path = store.name!.split('.')

      let currentFolders: Array<FolderProps> = folders

      path.reduce((prev, curr, i, arr) => {
        const path = `${prev}${prev ? '.' : ''}${curr}`

        let match = currentFolders.find((folder) => folder.path === prev)

        if (!match) {
          match = {
            files: [],
            folders: [],
            name: prev.split('.').slice(-1).join('.'),
            path: prev,
          }

          currentFolders.push(match)
        }

        currentFolders = match.folders

        if (i === arr.length - 1) {
          match.files.push({
            name: curr,
            path,
            store,
          })
        }

        return path
      }, '')
    }
  })

  return (
    <div className={`${css.outliner} __outliner`}>
      {folders.map((folder) => (
        <Folder
          key={folder.path}
          {...folder}
        ></Folder>
      ))}
    </div>
  )
}
