import { Derived, DerivedArray, Store } from '@packages/store'
import { Component, attachShadow, attachStyle } from '..'
import { button, input, span } from '@packages/element-constructor'

interface TodoParameters {
  name: string
}

interface Todo {
  done: Store<boolean>
  name: string
  id: number
}

function createTodoStore() {
  const store = new Store<Array<Todo>>([])

  let todoId = 0

  return {
    store,
    addTodo(parameters: TodoParameters) {
      store.current = [
        ...store.current,
        {
          id: todoId++,
          done: new Store(false),
          ...parameters,
        },
      ]
    },
    removeTodo(id: number) {
      store.current = store.current.filter((s) => s.id !== id)
    },
  }
}

const todoStore = createTodoStore()

const item = Component<Todo>('item', (props) => {
  return {
    id: `todo-${props.id}`,
    children: [
      span({
        children: props.name,
        style: {
          textDecoration: new Derived(props.done, (v) =>
            v ? 'line-through' : ''
          ),
        },
      }),
      button({
        children: 'Done',
        onClick(e) {
          props.done.current = !props.done.current
        },
      }),
      button({
        children: 'Remove',
        onClick(e) {
          todoStore.removeTodo(props.id)
        },
      }),
    ],
  }
})

const list = Component('list', () => {
  attachShadow()

  attachStyle({
    ':host': {
      display: 'grid',
      gap: '1vmin',
    },
  })

  return {
    children: new DerivedArray(todoStore.store, (v) => item(v)),
  }
})

const form = Component('form', () => {
  let inputElement: HTMLInputElement = null!

  return {
    children: [
      input({
        ref(e) {
          inputElement = e
        },
      }),
      button({
        children: 'add',
        onClick() {
          todoStore.addTodo({
            name: inputElement.value,
          })
        },
      }),
    ],
  }
})

const app = Component('app', () => {
  attachShadow()

  attachStyle({
    ':host': {
      display: 'grid',
      gap: '1vmin',
    },
  })

  return {
    children: [form(), list()],
  }
})

document.body.appendChild(app())
