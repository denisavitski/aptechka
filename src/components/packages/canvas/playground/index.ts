import '..'

const el = document.querySelector('e-canvas')!

el.renderEvent.subscribe((e) => {
  e.context.fillRect(100, 100, 100, 100)
})
