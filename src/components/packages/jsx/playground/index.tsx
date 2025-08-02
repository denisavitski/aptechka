import { Store } from '@packages/store'
import {
  useDerivedArrayStore,
  useDerivedStore,
  useRef,
  useStore,
} from '../hooks'

interface ItemProps {
  completed?: boolean
  name: string
}

const store = useStore<Array<ItemProps>>([])

export const Item: JSX.Component<ItemProps> = (props) => {
  return (
    <component>
      <div>{props.name}</div>
      <button
        onClick={() => {
          store.current = store.current.filter((v) => v.name !== props.name)
        }}
      >
        complete
        {store}
      </button>
    </component>
  )
}

export const List: JSX.Component = (props) => {
  const derivedStore = useDerivedArrayStore(store, (v) => {
    return <Item {...v}></Item>
  })

  return <component>{derivedStore}</component>
}

export const Form: JSX.Component = (props) => {
  const color = new Store('')
  const ref = useRef<HTMLInputElement>()

  addEventListener('keydown', (e) => {
    if (e.key === '1') {
      color.current = 'red'
    } else if (e.key === '2') {
      color.current = 'blue'
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        if (
          !store.current.find((v) => {
            return v.name === ref.current!.value
          })
        ) {
          store.current = [
            ...store.current,
            {
              name: ref.current!.value,
              completed: false,
            },
          ]
        }
      }}
    >
      <div style={{ color: color }}>TITLE</div>
      <input
        ref={ref}
        type="text"
      />
      <button>Add</button>
    </form>
  )
}

export const App: JSX.Component = (props) => {
  return (
    <component>
      <Form></Form>
      <List></List>
    </component>
  )
}
