import { useShadow, useStylesheet } from '@packages/jsx'
import { useDerivedKeyedArrayStore, useStore } from '@packages/jsx/hooks/store'

export interface FolderProps {
  key: string
}

export const Folder: JSX.Component<FolderProps> = (props) => {
  return (
    <component>
      <shadow>{props.key}</shadow>
    </component>
  )
}

export const Tweaker: JSX.Component = () => {
  useShadow()

  useStylesheet({
    ':host': {
      position: 'fixed',
      top: '20px',
      right: '20px',
    },
  })

  const folders = useStore<Array<FolderProps>>([])

  const foldersEls = useDerivedKeyedArrayStore(folders, (e) => {
    console.log('useDerivedKeyedArrayStore')
    return <Folder {...e}></Folder>
  })

  const s = useStore(1, { name: 'heh' })

  s.subscribe(() => {
    console.log('s SUB')
  })

  return (
    <component>
      <shadow>{folders}</shadow>
    </component>
  )
}
