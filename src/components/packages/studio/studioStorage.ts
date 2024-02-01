import { storeRegistry } from '@packages/store'

export interface StudioStorageState {
  openedPanels: Array<string>
}

class StudioStorage {
  #localStorageStudioName = ''
  #openedPanels: Array<string> = []

  constructor() {
    this.#localStorageStudioName = storeRegistry.projectName + '-studio'
  }

  public openPanel(key: string) {
    if (!this.#openedPanels.includes(key)) {
      this.#openedPanels.push(key)
    }
  }

  public closePanel(key: string) {
    this.#openedPanels = this.#openedPanels.filter((v) => v !== key)
  }

  public isPanelOpened(key: string) {
    return this.#openedPanels.includes(key)
  }

  public save() {
    const state: StudioStorageState = {
      openedPanels: this.#openedPanels,
    }

    localStorage.setItem(this.#localStorageStudioName, JSON.stringify(state))
  }

  public load() {
    const stringState = localStorage.getItem(this.#localStorageStudioName)

    if (stringState) {
      try {
        const state: StudioStorageState = JSON.parse(stringState)

        this.#openedPanels = state.openedPanels
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export const studioStorage = new StudioStorage()
