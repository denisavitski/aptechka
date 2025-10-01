export function requestLoadingCallback(
  event: 'DOMContentLoaded' | 'load' | 'idle' | 'loadWithDelay',
  callback: Function,
) {
  let idleId: ReturnType<typeof requestIdleCallback> | undefined
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let isCallbackCalled = false

  const safeCallback = () => {
    if (isCallbackCalled) return
    isCallbackCalled = true

    try {
      callback()
    } catch (error) {
      console.error('Error in loading callback:', error)
    }
  }

  const domListener = () => {
    window.removeEventListener('DOMContentLoaded', domListener)
    safeCallback()
  }

  const loadListener = () => {
    window.removeEventListener('load', loadListener)
    safeCallback()
  }

  const idleListener = (deadline: IdleDeadline) => {
    idleId = undefined
    safeCallback()
  }

  const delayListener = () => {
    window.removeEventListener('load', delayListener) // ← Исправлено

    timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        safeCallback()
      })
    }, 1000)
  }

  const clear = () => {
    window.removeEventListener('DOMContentLoaded', domListener)
    window.removeEventListener('load', loadListener)
    window.removeEventListener('load', delayListener)

    if (idleId !== undefined && 'cancelIdleCallback' in window) {
      window.cancelIdleCallback(idleId)
    }

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
  }

  if (event === 'idle' && 'requestIdleCallback' in window) {
    idleId = window.requestIdleCallback(idleListener, { timeout: 10000 })
  } else {
    const readyState = document.readyState

    if (event === 'load') {
      if (readyState === 'complete') {
        setTimeout(loadListener, 0)
      } else {
        window.addEventListener('load', loadListener)
      }
    } else if (event === 'loadWithDelay') {
      if (readyState === 'complete') {
        setTimeout(delayListener, 0)
      } else {
        window.addEventListener('load', delayListener)
      }
    } else if (event === 'DOMContentLoaded') {
      if (readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', domListener)
      } else {
        setTimeout(domListener, 0)
      }
    }
  }

  return clear
}
