import {
  getCumulativeOffsetLeft,
  getCumulativeOffsetTop,
} from '@packages/utils'
import { windowResizer } from '@packages/window-resizer'

const pointerElement = document.querySelector<HTMLElement>('.nav__pointer')!

const linkElements = document.querySelectorAll<HTMLElement>('.nav__link')!

let activeLink = linkElements[0]

linkElements.forEach((linkElement, linkIndex) => {
  const circleElement =
    linkElement.querySelector<HTMLElement>('.nav__link__circle')!

  function updatePointer() {
    if (activeLink === linkElement) {
      const circleLeft = getCumulativeOffsetLeft(circleElement)
      const circleTop = getCumulativeOffsetTop(circleElement)

      const pointerLeft = getCumulativeOffsetLeft(pointerElement)
      const pointerTop = getCumulativeOffsetTop(pointerElement)

      const dx = circleLeft - pointerLeft
      const dy = circleTop - pointerTop

      pointerElement.style.setProperty('--dx', dx + 'px')
      pointerElement.style.setProperty('--dy', dy + 'px')
      pointerElement.style.setProperty('--index', linkIndex.toString())
    }
  }

  windowResizer.subscribe(() => {
    pointerElement.style.transition = 'all 0s'

    updatePointer()

    setTimeout(() => {
      pointerElement.style.transition = ''
    }, 50)
  })

  linkElement.addEventListener('click', () => {
    activeLink = linkElement
    updatePointer()
  })
})
