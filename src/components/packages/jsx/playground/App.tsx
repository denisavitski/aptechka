import {
  createDerived,
  createDerivedComponents,
  createStore,
} from '../hooks/createStore'

interface Todo {
  id: number
  value: string
}

function createGlobalTodoStore() {
  const store = createStore<Array<Todo>>([])

  let id = 0

  return {
    store,
    create(value: string) {
      store.current = [
        ...store.current,
        {
          id: id++,
          value,
        },
      ]
    },
    delete(id: number) {
      store.current = store.current.filter((v) => v.id !== id)
    },
  }
}

const todos = createGlobalTodoStore()

export const Todo: JSX.Component<Todo> = (props) => {
  const completed = createStore(false)

  return (
    <li
      style={{
        textDecoration: createDerived(completed, (v) =>
          v ? 'line-through' : ''
        ),
      }}
    >
      <span onClick={() => (completed.current = !completed.current)}>
        {props.value}
      </span>

      <button onClick={() => todos.delete(props.id)}>delete</button>
    </li>
  )
}

export const List: JSX.Component = () => {
  return (
    <ul>
      {createDerivedComponents(todos.store, (v) => (
        <Todo {...v}></Todo>
      ))}
    </ul>
  )
}

export const Form: JSX.Component = () => {
  const value = createStore('')

  return (
    <component>
      <input
        onInput={(e) =>
          (value.current = (e.currentTarget as HTMLInputElement).value)
        }
      />
      <button onClick={() => todos.create(value.current)}>Add</button>
    </component>
  )
}

export const App: JSX.Component = () => {
  return (
    <component>
      <Form></Form>
      <List></List>
    </component>
  )
}
