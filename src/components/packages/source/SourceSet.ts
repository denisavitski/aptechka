import { Source } from './SourceClass'

export type SourceSetMediaSources = Array<Source>
export type SourceSetMediaBucket = Map<string, SourceSetMediaSources>

export class SourceSet {
  #mediaBuckets: SourceSetMediaBucket

  constructor(sourceSet: string | Array<string>) {
    this.#mediaBuckets = new Map()

    const mediaBuckets =
      typeof sourceSet === 'string'
        ? sourceSet
            .trim()
            .split(',')
            .map((u) => u.trim())
            .filter((u) => !!u)
        : sourceSet

    const tmp: Array<[string, Source]> = []

    mediaBuckets.forEach((v) => {
      const source = new Source(v)
      tmp.push([source.query, source])
    })

    const max = tmp
      .filter((v) => v[1].queryType.includes('max'))
      .sort((a, b) => b[1].queryValue - a[1].queryValue)

    const min = tmp
      .filter((v) => v[1].queryType.includes('min') && v[1].queryValue !== 0)
      .sort((a, b) => a[1].queryValue - b[1].queryValue)

    const defaultMatch = tmp.filter((t) => t[0] === '(min-width: 0px)')

    const sorted = defaultMatch
      ? [...defaultMatch, ...max, ...min]
      : [...max, ...min]

    sorted.forEach((v) => {
      if (!this.#mediaBuckets.has(v[0])) {
        this.#mediaBuckets.set(v[0], [])
      }

      this.#mediaBuckets.get(v[0])!.push(v[1])
    })
  }

  public get mediaBuckets() {
    return this.#mediaBuckets
  }
}
