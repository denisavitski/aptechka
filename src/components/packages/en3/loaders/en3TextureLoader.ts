import { TextureLoader } from 'three'
import { en3Cache } from './en3Cache'
import { en3 } from '../core/en3'

export const en3TextureLoader = new TextureLoader()

const load = en3TextureLoader.load.bind(en3TextureLoader)
const loadSync = en3TextureLoader.loadAsync.bind(en3TextureLoader)

en3TextureLoader.load = (url, onLoad, ...rest) => {
  if (en3.cacheAssets && en3Cache.has(url)) {
    const cached = en3Cache.get(url)!
    onLoad?.(cached.data)
    return cached.data
  }

  return load(
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

en3TextureLoader.loadAsync = async (url, ...rest) => {
  if (en3.cacheAssets && en3Cache.has(url)) {
    return en3Cache.get(url)!.data
  }

  const texture = await loadSync(url, ...rest)

  if (en3.cacheAssets) {
    en3Cache.set(url, {
      data: texture,
      dispose: () => texture.dispose(),
    })
  }

  return texture
}
