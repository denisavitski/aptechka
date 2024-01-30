export function resizeInterval({ ms = 200 } = {}) {
  setInterval(() => {
    window.dispatchEvent(new Event('resize'))
  }, ms)
}
