import { loading } from '@packages/client/loading'
import { SourceManagerParameters, SourceManager } from '@packages/client/source'
import { Store } from '@packages/client/store'
import { EventDispatcher, Loader } from 'three'

export interface En3SourceManagerLoader<T> {
  load: Loader<T>['load']
}

export interface En3SourceManagerFullParameters<T>
  extends SourceManagerParameters {
  keepSourceParameters?: boolean
  loader: En3SourceManagerLoader<T>
  lazy?: boolean
  consumer: EventDispatcher
}

export type En3SourceManagerParameters<T> = Omit<
  En3SourceManagerFullParameters<T>,
  'loader' | 'element' | 'consumer'
>

export type En3SourceManagerLoadingState =
  | 'start'
  | 'complete'
  | 'error'
  | undefined

export class En3SourceManager<T> extends SourceManager {
  #data = new Store<T | undefined | null>(null)
  #loading = new Store<En3SourceManagerLoadingState>(undefined)
  #consumer: EventDispatcher
  #loader: En3SourceManagerLoader<T>
  #isKeepSourceParameters: boolean
  #isLazy: boolean
  #isLazyLoaded = false

  constructor(parameters: En3SourceManagerFullParameters<T>) {
    super(parameters)

    this.#consumer = parameters.consumer
    this.#loader = parameters.loader
    this.#isKeepSourceParameters = parameters.keepSourceParameters || false
    this.#isLazy = parameters.lazy || false

    this.subscribe(this.#updateData)

    this.#consumer.addEventListener('added', () => {
      this.connect()
    })

    this.#consumer.addEventListener('removed', () => {
      this.disconnect()
    })
  }

  /**
   * Resource store.
   */
  public get data() {
    return this.#data
  }

  /**
   * Loading store.
   */
  public get loading() {
    return this.#loading
  }

  /**
   * Calling this method will start loading the resource.
   */
  public lazyLoad() {
    if (!this.#isLazyLoaded) {
      this.#isLazyLoaded = true
      this.#updateData()
    }
  }

  public processData?(data: T): T

  #updateData = () => {
    if (this.#isLazy && !this.#isLazyLoaded) {
      return
    }

    if (this.current !== this.previous) {
      this.#data.current = null
    }

    if (this.current) {
      const url = this.#isKeepSourceParameters
        ? this.current.url
        : this.current.name + this.current.extension

      if (!this.#isLazy) {
        loading.setTotal(url, 1)
      }

      this.#loading.current = 'start'

      this.#loader.load(
        url,
        (data) => {
          this.#data.current = this.processData?.(data) || data
          this.#loading.current = 'complete'

          if (!this.#isLazy) {
            loading.setLoaded(url, 1)
          }
        },
        undefined,
        () => {
          if (!this.#isLazy) {
            this.#loading.current = 'error'
            loading.setError(url, url)
          }
        }
      )
    }
  }
}
