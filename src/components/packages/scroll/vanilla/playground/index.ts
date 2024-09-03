import '../index'

const scrollElement = document.querySelector('e-scroll')!

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    scrollElement!.classList.add('triggered')
  } else if (e.key === '2') {
    scrollElement!.classList.remove('triggered')
  }
})
