import { storeRegistry } from '@packages/store'

export interface StudioStorageState {
  openedFolders: Array<string>
}

class StudioStorage {
  #localStorageStudioName = ''
  #openedFolders: Array<string> = new Array()

  constructor() {
    this.#localStorageStudioName = storeRegistry.projectName + '-studio'
  }

  public openFolder(folderKey: string) {
    if (!this.#openedFolders.includes(folderKey)) {
      this.#openedFolders.push(folderKey)
    }
  }

  public closeFolder(folderKey: string) {
    this.#openedFolders = this.#openedFolders.filter((f) => f !== folderKey)
  }

  public isFolderOpened(folderKey: string) {
    return this.#openedFolders.includes(folderKey)
  }

  public save() {
    const state: StudioStorageState = {
      openedFolders: this.#openedFolders,
    }

    localStorage.setItem(this.#localStorageStudioName, JSON.stringify(state))
  }

  public load() {
    const stringState = localStorage.getItem(this.#localStorageStudioName)

    if (stringState) {
      try {
        const state: StudioStorageState = JSON.parse(stringState)
        this.#openedFolders = state.openedFolders
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export const studioStorage = new StudioStorage()
