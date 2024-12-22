import '../index'

const scrollElement = document.querySelector('e-scroll')

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    const section = document.createElement('section')
    scrollElement?.appendChild(section)
  } else if (e.key === '2') {
    scrollElement?.querySelector('section')?.remove()
  }
})
