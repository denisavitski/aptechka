export function createJSONAndSave(filename: string, dataObjToWrite: object) {
  const blob = new Blob([JSON.stringify(dataObjToWrite)], {
    type: 'application/json',
  })
  const link = document.createElement('a')

  link.download = filename + '.json'
  link.href = window.URL.createObjectURL(blob)
  link.dataset.downloadurl = [
    'application/json',
    link.download,
    link.href,
  ].join(':')

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })

  link.dispatchEvent(evt)
  link.remove()
}

export function downloadURI(uri: string, name?: string) {
  const link = document.createElement('a')

  if (name) {
    link.setAttribute('download', name)
  }

  link.href = uri

  document.body.appendChild(link)

  link.click()

  link.remove()
}
