export class Source {
  #url: string
  #name: string
  #density: number
  #query: string
  #queryPx: number
  #queryType: 'max' | 'min'
  #extension: string

  constructor(url: string) {
    this.#url = url

    const firstQuestionIndex = url.indexOf('?')

    if (firstQuestionIndex >= 0) {
      url = url.slice(0, firstQuestionIndex)
    }

    const splitted = url.split('.')

    this.#name = splitted[0]

    const xpattern = /\d+x/g
    const xmatch = splitted.find((s) => s.match(xpattern))
    this.#density = xmatch ? parseInt(xmatch) : 1

    const maxpattern = /\d+max/g
    const minpattern = /\d+min/g

    const maxmatch = splitted.find((s) => s.match(maxpattern))
    const minmatch = splitted.find((s) => s.match(minpattern))

    if (maxmatch) {
      this.#queryPx = parseInt(maxmatch)
      this.#queryType = 'max'
      this.#query = `(max-width: ${this.#queryPx}px)`
    } else if (minmatch) {
      this.#queryPx = parseInt(minmatch)
      this.#query = `(min-width: ${this.#queryPx}px)`
      this.#queryType = 'min'
    } else {
      this.#queryPx = 0
      this.#query = `(min-width: ${this.#queryPx}px)`
      this.#queryType = 'min'
    }

    this.#extension = '.' + splitted[splitted.length - 1]
  }

  public get url() {
    return this.#url
  }

  public get name() {
    return this.#name
  }

  public get density() {
    return this.#density
  }

  public get query() {
    return this.#query
  }

  public get extension() {
    return this.#extension
  }

  public get queryType() {
    return this.#queryType
  }

  public get queryPx() {
    return this.#queryPx
  }
}
