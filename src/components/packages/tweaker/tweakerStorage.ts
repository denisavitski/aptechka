import { storeRegistry } from '@packages/store'

export interface TweakerStorageState {
  openedPanels: Array<string>
}

class TweakerStorage {
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
    const state: TweakerStorageState = {
      openedPanels: this.#openedPanels,
    }

    localStorage.setItem(this.#localStorageStudioName, JSON.stringify(state))
    storeRegistry.saveState()
  }

  public load() {
    storeRegistry.loadState()
    const stringState = localStorage.getItem(this.#localStorageStudioName)

    if (stringState) {
      try {
        const state: TweakerStorageState = JSON.parse(stringState)

        if (state.openedPanels) {
          this.#openedPanels = state.openedPanels
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export const tweakerStorage = new TweakerStorage()
