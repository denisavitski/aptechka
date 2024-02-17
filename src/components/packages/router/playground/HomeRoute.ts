import { Component } from '@packages/component'
import { a, h1 } from '@packages/element-constructor'
import { RouteParameters } from '..'

export default Component<RouteParameters>('home', (props) => {
  console.log(props)

  return {
    children: [
      h1({ children: 'HOME' }),
      a({
        href: '/about',
        children: 'CLICK',
        'data-history-action': 'none',
      }),
    ],
  }
})
