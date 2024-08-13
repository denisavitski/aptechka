addEventListener('loadingStart', (e) => {
  console.log('loadingStart', JSON.stringify(e.detail))
})

addEventListener('loadingProgress', (e) => {
  console.log('loadingProgress', JSON.stringify(e.detail))
})

addEventListener('loadingComplete', (e) => {
  console.log('loadingComplete', JSON.stringify(e.detail))
})
