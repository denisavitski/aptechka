import {
  useDerivedKeyedArrayStore,
  useDerivedStore,
  useShadow,
  useStore,
  useStylesheet,
  useTicker,
} from '@packages/jsx'
import { generateId } from '@packages/utils'
import { Test } from './Test'

interface TodoItem {
  value: string
  key: string
  complete: boolean
}

const store = useStore<Array<TodoItem>>([], {})

const ListItem: JSX.Component<TodoItem> = (props) => {
  useShadow()

  useStylesheet({
    ':host': {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
  })

  const completeStore = useStore(props.complete)

  return (
    <component>
      <shadow>
        <div
          style={{
            textDecoration: useDerivedStore(completeStore, (e) => {
              store.current.find((v) => v.key === props.key)!.complete = e
              return e ? 'line-through' : ''
            }),
          }}
        >
          {props.value}
        </div>
        <button onClick={() => completeStore.update((v) => !v)}>
          Complete
        </button>
        <button onClick={() => store.filter((v) => v.key !== props.key)}>
          Remove
        </button>
      </shadow>
    </component>
  )
}

const List: JSX.Component = () => {
  const items = useDerivedKeyedArrayStore(store, (value) => {
    return <ListItem {...value}></ListItem>
  })

  return <component>{items}</component>
}

const Form: JSX.Component = () => {
  const submitListener = (e: SubmitEvent) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    if (!formData.has('value')) {
      return
    }

    if (
      !store.current.find((v) => {
        return v.value === formData.get('value')
      })
    ) {
      store.add({
        value: formData.get('value')!.toString(),
        key: generateId(10),
        complete: false,
      })
    }
  }

  return (
    <form onSubmit={submitListener}>
      <input name={'value'}></input>
      <button>Add</button>
    </form>
  )
}

export const Todo: JSX.Component = () => {
  useShadow()

  useStylesheet({
    ':host': {
      display: 'grid',
      gap: '20px',
    },
  })

  useTicker(() => {})

  return (
    <component>
      <shadow>
        <Test></Test>
        <Form></Form>
        <List></List>
      </shadow>
    </component>
  )
}
