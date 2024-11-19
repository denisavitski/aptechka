import { Morph } from '../index'

const morph = new Morph({
  base: '/components/packages/morph/playground/',
  scrollSelector: '#scroll',
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
    document.querySelector('.page')?.prepend(el)
  }
})
