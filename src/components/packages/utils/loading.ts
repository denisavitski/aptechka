export function requestLoadingCallback(
  event: 'DOMContentLoaded' | 'load' | 'idle' | 'loadWithDelay',
  callback: Function,
) {
  let idleId: ReturnType<typeof requestIdleCallback> | undefined
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const domListener = () => {
    window.removeEventListener('DOMContentLoaded', loadListener)
    callback()
  }

  const loadListener = () => {
    window.removeEventListener('load', loadListener)
    callback()
  }

  const idleListener = () => {
    idleId = undefined
    callback()
  }

  const delayListener = () => {
    window.removeEventListener('load', loadListener)

    timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        callback()
      })
    }, 1000)
  }

  const clear = () => {
    window.removeEventListener('DOMContentLoaded', domListener)
    window.removeEventListener('load', loadListener)
    window.removeEventListener('load', delayListener)

    if (idleId && window.cancelIdleCallback) {
      window.cancelIdleCallback(idleId)
    }

    clearTimeout(timeoutId)
  }

  if (event === 'idle' && window.requestIdleCallback) {
    idleId = window.requestIdleCallback(idleListener, { timeout: 10000 })
  } else {
    if (event === 'load') {
      if (document.readyState === 'complete') {
        loadListener()
      } else {
        window.addEventListener('load', loadListener)
      }
    } else if (event === 'loadWithDelay') {
      if (document.readyState === 'complete') {
        delayListener()
      } else {
        window.addEventListener('load', delayListener)
      }
    } else if (event === 'DOMContentLoaded') {
      window.addEventListener('DOMContentLoaded', domListener)
    }
  }

  return clear
}
