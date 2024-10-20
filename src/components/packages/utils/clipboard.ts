export function copyTextToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard successfully!')
      })
      .catch((err) => {
        console.error('Failed to copy text to clipboard:', err)
      })
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text

    textArea.style.position = 'fixed'
    textArea.style.top = '0'
    textArea.style.left = '0'

    document.body.appendChild(textArea)
    textArea.select()

    try {
      const successful = document.execCommand('copy')
      if (successful) {
        console.log('Text copied to clipboard successfully!')
      } else {
        console.error('Failed to copy text to clipboard.')
      }
    } catch (err) {
      console.error('Failed to copy text to clipboard:', err)
    }

    document.body.removeChild(textArea)
  }
}
