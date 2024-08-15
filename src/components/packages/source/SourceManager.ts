import { RESIZE_ORDER } from '@packages/order'
import { windowResizer } from '@packages/window-resizer/vanilla'
import { Store } from '@packages/store/vanilla'
import type { Source } from './SourceClass'
import { SourceSet, SourceSetMediaSources } from './SourceSet'

export type SourceManagerSourceSet = string | Array<string>

export interface SourceManagerParameters {
  srcset: SourceManagerSourceSet
}

export class SourceManager extends Store<Source | undefined> {
  #srcset: SourceSet

  constructor(parameters: SourceManagerParameters) {
    super(undefined)

    this.#srcset = new SourceSet(parameters.srcset)
  }

  public override close() {
    super.close()
    this.disconnect()
  }

  public connect() {
    windowResizer.subscribe(this.#resizeListener, RESIZE_ORDER.SOURCE_MANAGER)
  }

  public disconnect() {
    windowResizer.unsubscribe(this.#resizeListener)
  }

  #resizeListener = () => {
    let matchedSources: SourceSetMediaSources | undefined

    this.#srcset.mediaBuckets.forEach((sources, query) => {
      if (matchMedia(query).matches) {
        matchedSources = sources
      }
    })

    let matchedSouce: Source | undefined

    let maxDensity = 0

    matchedSources?.forEach((s) => {
      if (
        s.density > maxDensity &&
        s.density <= Math.max(devicePixelRatio, 1)
      ) {
        maxDensity = s.density
        matchedSouce = s
      }
    })

    if (matchedSources?.length && !matchedSouce) {
      matchedSouce = matchedSources[0]
    }

    this.current = matchedSouce
  }
}
