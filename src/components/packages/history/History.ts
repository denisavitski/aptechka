export interface HistoryOptions {
  onPop: (url: URL) => void
}

export class History {
  #isBack = false
  #options: HistoryOptions

  constructor(options: HistoryOptions) {
    window.addEventListener('popstate', this.#popstateListener)

    this.#options = options
  }

  public get isBack() {
    return this.#isBack
  }

  public push(url: string | URL) {
    history.pushState({}, '', `${url}`)
  }

  public destroy() {
    window.removeEventListener('popstate', this.#popstateListener)
  }

  #popstateListener = () => {
    if (window.location.hash) {
      return
    }

    try {
      this.#isBack = true
      this.#options.onPop(new URL(window.location.toString()))
      this.#isBack = false
    } catch (e) {
      window.location.reload()
    }
  }
}
