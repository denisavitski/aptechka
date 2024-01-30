const acc = document.querySelector('e-accordion')!

addEventListener('keydown', (e) => {
  if (e.key === '1') {
    acc?.remove()
  } else if (e.key === '2') {
    document.body.appendChild(acc)
  }
})
