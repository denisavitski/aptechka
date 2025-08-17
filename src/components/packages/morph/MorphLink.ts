import { cssValueParser } from '@packages/css-value-parser'
import { camelToKebab, ChangeHistoryAction } from '@packages/utils'
import { Morph } from './Morph'

export class MorphLink {
  #morph: Morph
  #element: HTMLAnchorElement

  constructor(element: HTMLAnchorElement, morph: Morph) {
    this.#morph = morph
    this.#element = element

    this.#element.addEventListener('click', this.#clickListener)

    this.checkCurrent(location.href.replace(location.origin, ''))

    if (this.#element.hasAttribute('data-prefetch')) {
      this.#element.addEventListener('pointerenter', this.#pointerListener)
    }
  }

  public get element() {
    return this.#element
  }

  public checkCurrent(path: string) {
    const locationUrl = this.#morph.normalizePath(path)
    const linkUrl = this.#morph.normalizePath(this.#path)

    if (
      this.#element.hasAttribute('data-include') &&
      locationUrl.pathname.includes(linkUrl.pathname)
    ) {
      this.#element.classList.add('current')
    } else if (linkUrl.pathname === locationUrl.pathname) {
      this.#element.classList.add('current')
    } else if (
      this.#element
        .getAttribute('data-associated-paths')
        ?.split(',')
        .find((path) => locationUrl.pathname.includes(path))
    ) {
      this.#element.classList.add('current')
    } else {
      this.#element.classList.remove('current')
    }

    if (locationUrl.path === linkUrl.path) {
      this.#element.classList.add('exact')
    } else {
      this.#element.classList.remove('exact')
    }

    const [pathWithoutParams, pathParamsStr] = this.#path
      .split('#')[0]
      ?.split('?')
    const pathParams = new URLSearchParams(pathParamsStr)
    const locationParams = new URLSearchParams(location.search)

    let matchCounter = 0

    for (const [key] of locationParams) {
      if (
        pathParams.has(key) &&
        locationParams.get(key) === pathParams.get(key)
      ) {
        matchCounter++
      }
    }

    if (matchCounter) {
      this.#element.classList.toggle(
        'all-params-matched',
        locationParams.size === matchCounter,
      )
      this.#element.classList.toggle(
        'some-params-matched',
        locationParams.size !== matchCounter,
      )
    } else if (
      !locationParams.size &&
      this.#element.hasAttribute('data-match-no-params')
    ) {
      this.#element.classList.add('all-params-matched')
    } else {
      this.#element.classList.remove('all-params-matched')
      this.#element.classList.remove('some-params-matched')
    }

    for (const key in this.#element.dataset) {
      const kebabKey = camelToKebab(key)

      if (kebabKey.startsWith('match-param-')) {
        const name = kebabKey.split('match-param-')[1]
        const value = this.#element.dataset[key]!

        const className = `param-${name}-matched`

        if (
          (locationParams.has(name) && locationParams.get(name) === value) ||
          (!locationParams.has(name) &&
            (value === '' ||
              value === '*' ||
              value === 'all' ||
              value === 'any' ||
              value === 'vse'))
        ) {
          this.#element.classList.add(className)
        } else {
          this.#element.classList.remove(className)
        }
      }
    }
  }

  public destroy() {
    this.#element.removeEventListener('click', this.#clickListener)
    this.#element.removeEventListener('pointerenter', this.#pointerListener)
    this.#element.classList.remove('current', 'exact')
  }

  get #path() {
    const url = new URL(this.#element.href)
    const normalizedURL = this.#morph.normalizePath(
      url.pathname + url.search + url.hash,
    )

    return normalizedURL.path
  }

  #click() {
    if (document.documentElement.classList.contains('click-disabled')) {
      return
    }

    const back = this.#element.hasAttribute('data-back')

    if (back && this.#morph.previousURL) {
      history.back()
    } else {
      const historyAction =
        (this.#element.getAttribute(
          'data-history-action',
        ) as ChangeHistoryAction) || 'push'

      const centerScroll = this.#element.hasAttribute('data-center-scroll')

      const offsetScrollRawValue = getComputedStyle(this.#element)
        .getPropertyValue('--offset-scroll')
        .trim()

      const offsetScroll = offsetScrollRawValue
        ? cssValueParser.parse(offsetScrollRawValue)
        : undefined

      const revalidate =
        this.#element.hasAttribute('data-revalidate') ||
        this.#element.hasAttribute('data-pagination-more-link') ||
        this.#element.hasAttribute('data-pagination-set-link') ||
        this.#element.hasAttribute('data-pagination-next-link') ||
        this.#element.hasAttribute('data-pagination-prev-link')

      const keepSearchParameters = this.#element.hasAttribute(
        'data-keep-search-parameters',
      )

      const keepScrollPosition =
        this.#element.hasAttribute('data-keep-scroll-position') ||
        this.#element.hasAttribute('data-pagination-more-link')

      const scrollBehaviour = this.#element.getAttribute(
        'data-scroll-behaviour',
      ) as ScrollBehavior

      const submorph = (
        this.#element.getAttribute('data-submorph') ||
        this.#element.getAttribute('data-submorph-append')
      )
        ?.split(',')
        .map((v) => v.trim())

      const clearState = this.#element.hasAttribute('data-clear-state')

      let path = this.#path

      if (this.#element.hasAttribute('data-toggle-params')) {
        const [pathWithoutParams, pathParamsStr] = this.#path.split('?')
        const pathParams = new URLSearchParams(pathParamsStr)
        const locationParams = new URLSearchParams(location.search)
        const resultParams = new URLSearchParams()

        for (const [key] of pathParams) {
          if (
            !locationParams.has(key) ||
            (locationParams.has(key) &&
              locationParams.get(key) !== pathParams.get(key))
          ) {
            resultParams.append(key, pathParams.get(key)!)
          }
        }

        if (this.#element.hasAttribute('data-merge-params')) {
          for (const [key] of locationParams) {
            if (!pathParams.has(key)) {
              resultParams.append(key, locationParams.get(key)!)
            }
          }
        }

        path = `${pathWithoutParams}?${resultParams.toString()}`
      }

      this.#morph.navigate(path, {
        historyAction,
        centerScroll,
        offsetScroll,
        revalidate,
        keepSearchParameters,
        submorph,
        clearState,
        keepScrollPosition,
        scrollBehaviour,
        submorphAppend: this.#element.hasAttribute('data-submorph-append'),
        mergeParams:
          this.#element.hasAttribute('data-merge-params') &&
          !this.#element.hasAttribute('data-toggle-params'),
        detail: this.#element.getAttribute('data-detail'),
        removeParams:
          this.#element.getAttribute('data-remove-params') || undefined,
        scrollTo: this.#element.getAttribute('data-scroll-to') || undefined,
      })
    }
  }

  #clickListener = (e: MouseEvent) => {
    e.preventDefault()

    this.#click()
  }

  #pointerListener = () => {
    const revalidate = this.#element.hasAttribute('data-revalidate')
    this.#morph.prefetch(this.#path, revalidate)
    this.#element.removeEventListener('pointerenter', this.#pointerListener)
  }
}
