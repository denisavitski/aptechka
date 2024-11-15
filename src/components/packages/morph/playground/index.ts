import '@packages/image'
import '@packages/popover'

import { Morph } from '../Morph'

const morph = new Morph({
  base: '/components/packages/morph/playground/',
})

document.addEventListener('morphBeforeElementSwitch', () => {
  document.documentElement.classList.add('switch')
})

document.addEventListener('morphAfterElementSwitch', () => {
  document.documentElement.classList.remove('switch')
})

addEventListener('loadingStart', (e) => {})

addEventListener('loadingProgress', (e) => {})

addEventListener('loadingComplete', (e) => {})

addEventListener('keydown', (e) => {
  if (e.code === 'KeyH') {
    const el = document.createElement('div')
    el.innerHTML = Math.random().toString()
    document.querySelector('.content')?.prepend(el)
  }
})
