import '@packages/media-elements'
import '@packages/popover'

import { Morph } from '../Morph'
import { wait } from '@packages/utils'

const morph = new Morph({
  base: '/components/packages/morph/playground/',
})

document.addEventListener('morphBeforeElementSwitch', () => {
  document.documentElement.classList.add('switch')
})

document.addEventListener('morphAfterElementSwitch', () => {
  document.documentElement.classList.remove('switch')
})

addEventListener('loadingStart', (e) => {
  console.log('-----')
  console.log('loadingStart', JSON.stringify(e.detail))
})

addEventListener('loadingProgress', (e) => {
  console.log('loadingProgress', JSON.stringify(e.detail))
})

addEventListener('loadingComplete', (e) => {
  console.log('loadingComplete', JSON.stringify(e.detail))
})
