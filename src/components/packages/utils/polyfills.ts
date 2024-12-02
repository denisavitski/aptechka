export function nullishCoalescing<D, V = D>(value: V, defaultValue: D) {
  return typeof value === 'undefined' ? defaultValue : value
}

export function requestIdleCallback(
  callback: IdleRequestCallback,
  options: IdleRequestOptions = {}
) {
  if (window.requestIdleCallback) {
    return window.requestIdleCallback(callback, options)
  } else {
    const relaxation = 1
    const timeout = options.timeout || relaxation
    const start = performance.now()

    return setTimeout(() => {
      callback({
        get didTimeout() {
          return options.timeout
            ? false
            : performance.now() - start - relaxation > timeout
        },
        timeRemaining() {
          return Math.max(0, relaxation + (performance.now() - start))
        },
      })
    }, relaxation)
  }
}
