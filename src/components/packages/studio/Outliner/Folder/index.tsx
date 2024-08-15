import React, { memo, useState } from 'react'
import css from './index.module.css'
import { File, FileProps } from '../File'

export interface FolderProps {
  name: string
  path: string
  folders: Array<FolderProps>
  files: Array<FileProps>
}

export const Folder: React.FC<FolderProps> = memo(
  ({ name, folders, files }) => {
    const [open, setOpen] = useState(false)

    return (
      <div className={`${css.folder} ${open ? css.open : ''}`}>
        <div
          className={css.folderHead}
          onClick={() => setOpen(!open)}
        >
          <div className={css.title}>{name}</div>
        </div>

        <div className={css.body}>
          <div className={css.content}>
            {folders.map((folder) => (
              <Folder
                key={folder.path}
                {...folder}
              ></Folder>
            ))}

            {files.map((file) => (
              <File
                key={file.path}
                {...file}
              ></File>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
