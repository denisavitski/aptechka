export interface HistoryManagerState {
  page: string
  data?: Record<string, unknown>
  timestamp?: number
}

export interface HistoryManagerChangeParameters {
  action: HistoryManagerChangeAction
  pathname: string
  searchParameters?: string
  hash?: string
  data?: Record<string, unknown>
}

export type HistoryManagerChangeAction = 'replace' | 'push' | 'none'

export interface HistoryManagerPopStateEvent extends PopStateEvent {
  state: HistoryManagerState | null
  previousState: HistoryManagerState | null
}

export type PopStateHandler = (event: HistoryManagerPopStateEvent) => void

class HistoryManager {
  #previousStates: HistoryManagerState[]
  #popStateHandlers: PopStateHandler[]
  #maxHistorySize: number = 50

  constructor() {
    history.scrollRestoration = 'manual'

    // Инициализируем с текущим состоянием или создаем дефолтное
    const initialState = history.state as HistoryManagerState | null
    if (initialState?.page) {
      this.#previousStates = [initialState]
    } else {
      const defaultState: HistoryManagerState = {
        page:
          window.location.pathname +
          window.location.search +
          window.location.hash,
        timestamp: Date.now(),
      }
      this.#previousStates = [defaultState]
      history.replaceState(defaultState, '', defaultState.page)
    }

    this.#popStateHandlers = []
    this.#setupTracking()
  }

  public get size() {
    return this.#previousStates.length
  }

  #setupTracking() {
    window.addEventListener('popstate', this.#handlePopState.bind(this))
    this.#overrideHistoryMethods()
  }

  #overrideHistoryMethods() {
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = (
      state: HistoryManagerState | null,
      title: string,
      url?: string | null,
    ) => {
      if (state && 'page' in state) {
        this.#updateHistory(state as HistoryManagerState, false)
      }
      return originalPushState.call(history, state, title, url)
    }

    history.replaceState = (
      state: HistoryManagerState | null,
      title: string,
      url?: string | null,
    ) => {
      if (state && 'page' in state) {
        this.#updateHistory(state as HistoryManagerState, true)
      }
      return originalReplaceState.call(history, state, title, url)
    }
  }

  #updateHistory(state: HistoryManagerState, isReplace: boolean = false) {
    if (isReplace && this.#previousStates.length > 0) {
      this.#previousStates[this.#previousStates.length - 1] = state
    } else {
      this.#previousStates.push(state)
      if (this.#previousStates.length > this.#maxHistorySize) {
        this.#previousStates.shift()
      }
    }
  }

  #handlePopState(event: PopStateEvent) {
    const previousState = this.getCurrentState()
    const currentState = event.state as HistoryManagerState | null

    // Синхронизируем с браузерным history
    if (currentState && currentState.page) {
      this.#previousStates.push(currentState)

      // Ограничиваем размер истории
      if (this.#previousStates.length > this.#maxHistorySize) {
        this.#previousStates.shift()
      }
    }

    this.#popStateHandlers.forEach((handler) => {
      handler({
        ...event,
        state: currentState,
        previousState: previousState,
      })
    })
  }

  #getPathname(url: string | URL): string {
    if (typeof url === 'string') {
      return url
    } else {
      return url.pathname + url.search + url.hash
    }
  }

  public getPreviousState(): HistoryManagerState | null {
    return this.#previousStates.length > 1
      ? this.#previousStates[this.#previousStates.length - 2]
      : null
  }

  public getCurrentState(): HistoryManagerState | null {
    return this.#previousStates.length > 0
      ? this.#previousStates[this.#previousStates.length - 1]
      : null
  }

  public addPopStateHandler(handler: PopStateHandler, unshift?: boolean) {
    if (unshift) {
      this.#popStateHandlers.unshift(handler)
    } else {
      this.#popStateHandlers.push(handler)
    }
  }

  public removePopStateHandler(handler: PopStateHandler) {
    const index = this.#popStateHandlers.indexOf(handler)
    if (index > -1) {
      this.#popStateHandlers.splice(index, 1)
    }
  }

  public updateCurrentStateData(data: Record<string, unknown>) {
    const state = this.getCurrentState()
    if (state) {
      const newState: HistoryManagerState = {
        ...state,
        data: {
          ...state.data,
          ...data,
        },
      }

      // Обновляем внутреннее состояние
      this.#previousStates[this.#previousStates.length - 1] = newState

      // Синхронизируем с history API
      history.replaceState(newState, '', state.page)
    }
  }

  public updatePreviousStateData(data: Record<string, unknown>) {
    const state = this.getPreviousState()
    if (state) {
      const newState: HistoryManagerState = {
        ...state,
        data: {
          ...state.data,
          ...data,
        },
      }

      // Обновляем внутреннее состояние
      this.#previousStates[this.#previousStates.length - 2] = newState

      // Для предыдущего состояния не вызываем replaceState,
      // так как это может нарушить навигацию браузера
    }
  }

  public pushState(page: string | URL, data?: Record<string, unknown>) {
    const pageString = page.toString()
    const state: HistoryManagerState = {
      page: this.#getPathname(page),
      data,
      timestamp: Date.now(),
    }

    history.pushState(state, '', pageString)
  }

  public replaceState(page: string | URL, data?: Record<string, unknown>) {
    const pageString = page.toString()
    const state: HistoryManagerState = {
      page: this.#getPathname(page),
      data,
      timestamp: Date.now(),
    }

    history.replaceState(state, '', pageString)
  }

  public back() {
    history.back()
  }

  public forward() {
    history.forward()
  }

  public go(delta: number) {
    history.go(delta)
  }

  public syncWithBrowser() {
    // Полная синхронизация с текущим состоянием браузера
    const browserState = history.state as HistoryManagerState | null
    if (browserState?.page) {
      const currentState = this.getCurrentState()
      if (currentState?.page !== browserState.page) {
        this.#previousStates.push(browserState)
      }
    }
  }

  public clearHistory() {
    // Оставляем только текущее состояние
    const currentState = this.getCurrentState()
    if (currentState) {
      this.#previousStates = [currentState]
    }
  }

  // Для Morph. Убрать когда там будут URL
  public __change(parameters: HistoryManagerChangeParameters) {
    if (parameters.action === 'none') {
      return
    }

    const searchParams = parameters.searchParameters || ''
    const hash = parameters.hash
      ? parameters.hash.startsWith('#')
        ? parameters.hash
        : '#' + parameters.hash
      : ''
    const searchString = searchParams
      ? searchParams.startsWith('?')
        ? searchParams
        : '?' + searchParams
      : ''

    const pathPlus = `${parameters.pathname}${searchString}${hash}`

    if (parameters.action === 'push') {
      this.pushState(pathPlus, parameters.data)
    } else if (parameters.action === 'replace') {
      this.replaceState(pathPlus, parameters.data)
    }
  }

  public debugHistory() {
    console.log('=== HistoryManager Debug ===')
    console.log('Current browser state:', history.state)
    console.log('Internal states stack:')
    this.#previousStates.forEach((state, index) => {
      const isCurrent = index === this.#previousStates.length - 1
      console.log(
        `[${index}]${isCurrent ? ' (current)' : ''}:`,
        state?.page,
        state?.timestamp ? new Date(state.timestamp).toLocaleTimeString() : '',
        state?.data ? '(has data)' : '',
      )
    })
    console.log('============================')
  }

  public setMaxHistorySize(size: number) {
    if (size > 0) {
      this.#maxHistorySize = size
      while (this.#previousStates.length > size) {
        this.#previousStates.shift()
      }
    }
  }
}

export const historyManager = new HistoryManager()
