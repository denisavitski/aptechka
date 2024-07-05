import { TextureLoader } from 'three'
import { en3Cache } from '../core/en3Cache'
import { en3 } from '../core/en3'

export class En3TextureLoader {
  #loader = new TextureLoader()

  #load: TextureLoader['load']
  #loadSync: TextureLoader['loadAsync']

  constructor() {
    this.#load = this.#loader.load.bind(this.#loader)
    this.#loadSync = this.#loader.loadAsync.bind(this.#loader)
  }

  public load(...parameters: Parameters<TextureLoader['load']>) {
    const [url, onLoad, ...rest] = parameters

    if (en3.cacheAssets && en3Cache.has(url)) {
      const cached = en3Cache.get(url)!
      onLoad?.(cached.data)
      return cached.data
    }

    return this.#load(
      url,
      (e) => {
        if (en3.cacheAssets) {
          en3Cache.set(url, {
            data: e,
            dispose: () => e.dispose(),
          })
        }

        onLoad?.(e)
      },
      ...rest
    )
  }

  public async loadSync(...parameters: Parameters<TextureLoader['loadAsync']>) {
    const [url, ...rest] = parameters

    if (en3.cacheAssets && en3Cache.has(url)) {
      return en3Cache.get(url)!.data
    }

    const texture = await this.#loadSync(url, ...rest)

    if (en3.cacheAssets) {
      en3Cache.set(url, {
        data: texture,
        dispose: () => texture.dispose(),
      })
    }

    return texture
  }
}
