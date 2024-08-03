import { storeRegistry } from '@packages/client/store'

export type TweakerOpenedPanels = Array<string>
export type TweakerChangedSizes = { [key: string]: number }

export interface TweakerStorageState {
  openedPanels: TweakerOpenedPanels
  changedSizes: TweakerChangedSizes
  scrollValue: number
}

class TweakerStorage {
  public scrollValue = 0

  #localStorageStudioName = ''
  #openedPanels: TweakerOpenedPanels = []
  #changedSizes: TweakerChangedSizes = {}

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

  public changedSizes(key: string) {
    return this.#changedSizes[key]
  }

  public changeSize(key: string, value?: number | undefined | null) {
    if (value) {
      this.#changedSizes[key] = value
    } else {
      delete this.#changedSizes[key]
    }
  }

  public save() {
    const state: TweakerStorageState = {
      openedPanels: this.#openedPanels,
      changedSizes: this.#changedSizes,
      scrollValue: this.scrollValue,
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

        if (state.changedSizes) {
          this.#changedSizes = state.changedSizes
        }

        if (state.scrollValue) {
          this.scrollValue = state.scrollValue
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export const tweakerStorage = new TweakerStorage()
