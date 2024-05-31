import '..'

const form = document.querySelector('form')!

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(form)
  console.log('SUBMIT')

  // Display the key/value pairs
  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1])
  }
})
