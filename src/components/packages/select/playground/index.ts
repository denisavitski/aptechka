const acc = document.querySelector('e-select')!

const el = document.createElement('div')

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    acc.appendChild(el)
  } else if (e.key === '2') {
    el.appendChild(document.createElement('div'))
  }
})
