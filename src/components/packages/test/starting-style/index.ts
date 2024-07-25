const item = document.querySelector('.item') as HTMLElement
const head = item.querySelector('.head') as HTMLElement

head.addEventListener('click', () => {
  console.log(head)
  item.classList.toggle('opened')
})
