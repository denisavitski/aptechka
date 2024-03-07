import { Derived, DerivedArray, Store } from '@packages/store'
import { Component, attachShadow, attachStyle } from '..'
import { button, input, span, ul } from '@packages/element-constructor'

interface TodoData {
  id: number
  title: string
  complete: Store<boolean>
}

function createTodoStore() {
  const store = new Store<Array<TodoData>>([])

  let counter = 0

  return {
    store,
    addTodo(title: string) {
      store.current = [
        ...store.current,
        { title, complete: new Store(false), id: counter++ },
      ]
    },
    removeTodo(id: number) {
      store.current = store.current.filter((item) => item.id !== id)
    },
  }
}

const todoStore = createTodoStore()

const todo = Component<TodoData>('todo', (props) => {
  attachStyle({
    '[data-id]': {
      color: 'red',
    },
  })

  return {
    'data-id': props.id,
    children: [
      span({
        children: props.title,
        style: {
          textDecoration: new Derived(props.complete, (v) =>
            v ? 'line-through' : null
          ),
        },
      }),

      button({
        children: 'Complete',
        onClick() {
          props.complete.current = !props.complete.current
        },
      }),
      button({
        children: 'Remove',
        onClick() {
          todoStore.removeTodo(props.id)
        },
      }),
    ],
  }
})

const list = Component('list', () => {
  attachShadow()

  attachStyle({
    ul: {
      display: 'grid',
      gap: '1vmin',
    },
  })

  return {
    children: ul({
      children: new DerivedArray(todoStore.store, (todoData) => todo(todoData)),
    }),
  }
})

const form = Component('form', () => {
  let inputElement: HTMLInputElement = null!

  return {
    children: [
      input({ ref: (e) => (inputElement = e) }),
      button({
        children: 'Add',
        onClick() {
          if (inputElement.value) {
            todoStore.addTodo(inputElement.value)
          }
        },
      }),
    ],
  }
})

const app = Component('app', () => {
  return {
    children: [form(), list()],
  }
})

document.body.appendChild(app())
