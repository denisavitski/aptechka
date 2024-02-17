import { Component } from '@packages/component'
import { a, h1 } from '@packages/element-constructor'

export default Component('about', () => {
  console.log('ABOUT')

  return {
    children: [
      h1({ children: 'ABOUT' }),
      a({
        href: '/',
        children: 'CLICK',
        'data-history-action': 'none',
      }),
    ],
  }
})
