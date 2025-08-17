export class Cache {
  #cache = new Map<string, { timestamp: number; result: any; ttl: number }>()

  public get(key: string) {
    const entry = this.#cache.get(key)

    if (!entry) return null

    const isExpired = Date.now() - entry.timestamp >= entry.ttl

    if (isExpired) {
      this.delete(key)
    }

    return entry.result
  }

  public set(key: string, value: any, ttl?: number) {
    this.#cache.set(key, {
      timestamp: Date.now(),
      result: value,
      ttl: ttl ? ttl * 60 * 1000 : Infinity,
    })
  }

  public delete(key: string) {
    this.#cache.delete(key)
  }

  public cleanup() {
    const now = Date.now()

    for (const [key, entry] of this.#cache.entries()) {
      if (now - entry.timestamp >= entry.ttl) {
        this.#cache.delete(key)
      }
    }
  }

  public clear() {
    this.#cache.clear()
  }
}
