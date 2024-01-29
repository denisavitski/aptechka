class User {
  #idleTimeoutId: ReturnType<typeof setTimeout> | undefined
  #isIdle = true

  public get isIdle() {
    return this.#isIdle
  }

  public registerInteraction() {
    clearTimeout(this.#idleTimeoutId)

    this.#isIdle = false

    this.#idleTimeoutId = setTimeout(() => {
      this.#isIdle = true
    }, 2000)
  }
}

export const user = new User()
