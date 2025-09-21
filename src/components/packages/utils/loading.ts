export function requestLoadingCallback(
  event: 'DOMContentLoaded' | 'load' | 'idle',
  callback: Function,
) {
  let idleId: ReturnType<typeof requestIdleCallback> | undefined

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

  const clear = () => {
    window.removeEventListener('DOMContentLoaded', domListener)
    window.removeEventListener('load', loadListener)

    if (idleId && window.cancelIdleCallback) {
      window.cancelIdleCallback(idleId)
    }
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
    } else if (event === 'DOMContentLoaded') {
      window.addEventListener('DOMContentLoaded', domListener)
    }
  }

  return clear
}
