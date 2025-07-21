import { ChangeHistoryAction, clamp, debounce } from '@packages/utils'
import { Morph } from './Morph'
import { cssValueParser } from '@packages/css-value-parser'

export class MorphLink {
  #morph: Morph
  #element: HTMLAnchorElement

  constructor(element: HTMLAnchorElement, morph: Morph) {
    this.#morph = morph
    this.#element = element

    this.#element.addEventListener('click', this.#clickListener)

    this.checkCurrent(location.href.replace(location.origin, ''))

    const paginatedElement = this.#getPaginatedElement(
      this.#element.getAttribute('data-pagination-set-link') ||
        this.#element.getAttribute('data-pagination-more-link') ||
        this.#element.getAttribute('data-pagination-next-link') ||
        this.#element.getAttribute('data-pagination-prev-link')
    )

    if (paginatedElement) {
      this.updatePagination(
        paginatedElement.currentPage,
        paginatedElement.selector
      )
    }

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

    const [pathWithoutParams, pathParamsStr] = this.#path.split('?')
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
        locationParams.size === matchCounter
      )
      this.#element.classList.toggle(
        'some-params-matched',
        locationParams.size !== matchCounter
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
  }

  public updatePagination(newPage: number, selector: string) {
    const paginatedElement = this.#getPaginatedElement(selector)

    if (paginatedElement) {
      paginatedElement.element.setAttribute(
        'data-current-page',
        newPage.toString()
      )

      if (this.#element.hasAttribute('data-pagination-more-link')) {
        if (newPage < paginatedElement.totalPages) {
          this.#element.style.display = ''

          const counterElement = this.#element.querySelector(
            '[data-pagination-more-link-counter]'
          )

          if (counterElement) {
            counterElement.textContent = (
              paginatedElement.totalPages - newPage
            ).toString()
          }

          const href = this.#element.getAttribute('href')!
          const url = new URL(href, window.location.origin)
          url.searchParams.set('page', (newPage + 1).toString())

          const path = url.href.replace(url.origin, '').toString()
          this.#element.setAttribute('href', path)
          this.checkCurrent(path)
        } else {
          this.#element.style.display = 'none'
        }
      } else if (
        this.#element.hasAttribute('data-pagination-prev-link') ||
        this.#element.hasAttribute('data-pagination-next-link')
      ) {
        const isPrev = this.#element.hasAttribute('data-pagination-prev-link')
        const href = this.#element.getAttribute('href')!
        const url = new URL(href, window.location.origin)

        const nextPage = newPage + (isPrev ? -1 : 1)

        url.searchParams.set(
          'page',
          clamp(nextPage, 1, paginatedElement.totalPages).toString()
        )

        const path = url.href.replace(url.origin, '').toString()
        this.#element.setAttribute('href', path)

        if (isPrev) {
          if (nextPage < 1) {
            this.#element.classList.add('pagination-disabled')
            this.#element.setAttribute('tabindex', '-1')
          } else {
            this.#element.classList.remove('pagination-disabled')
            this.#element.removeAttribute('tabindex')
          }
        } else {
          if (nextPage > paginatedElement.totalPages) {
            this.#element.classList.add('pagination-disabled')
            this.#element.setAttribute('tabindex', '-1')
          } else {
            this.#element.classList.remove('pagination-disabled')
            this.#element.removeAttribute('tabindex')
          }
        }
      } else if (this.#element.hasAttribute('data-pagination-set-link')) {
        const value = this.#element.getAttribute('data-value')

        if (value === newPage.toString()) {
          this.#element.classList.add('pagination-current')
        } else {
          this.#element.classList.remove('pagination-current')
        }
      }
    }
  }

  public destroy() {
    this.#element.removeEventListener('click', this.#clickListener)
    this.#element.removeEventListener('pointerenter', this.#pointerListener)
    this.#element.classList.remove('current', 'exact', 'pagination-current')
  }

  get #path() {
    const url = new URL(this.#element.href)
    const normalizedURL = this.#morph.normalizePath(
      url.pathname + url.search + url.hash
    )

    return normalizedURL.path
  }

  #getPaginatedElement(selector?: string | undefined | null) {
    if (!selector) {
      return
    }

    const element = document.querySelector(selector)

    if (element) {
      const currentPage = parseInt(
        element.getAttribute('data-current-page') || '1'
      )
      const totalPages = parseInt(
        element.getAttribute('data-total-pages') || '1'
      )

      return {
        element,
        currentPage,
        totalPages,
        selector,
      }
    }
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
          'data-history-action'
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
        'data-keep-search-parameters'
      )

      const keepScrollPosition =
        this.#element.hasAttribute('data-keep-scroll-position') ||
        this.#element.hasAttribute('data-pagination-more-link')

      const scrollBehaviour = this.#element.getAttribute(
        'data-scroll-behaviour'
      ) as ScrollBehavior

      const submorph =
        this.#element
          .getAttribute('data-submorph')
          ?.split(',')
          .map((v) => v.trim()) ||
        (this.#element.hasAttribute('data-pagination-more-link') && [
          this.#element.getAttribute('data-pagination-more-link')!,
        ]) ||
        (this.#element.hasAttribute('data-pagination-set-link') && [
          this.#element.getAttribute('data-pagination-set-link')!,
        ]) ||
        (this.#element.hasAttribute('data-pagination-next-link') && [
          this.#element.getAttribute('data-pagination-next-link')!,
        ]) ||
        (this.#element.hasAttribute('data-pagination-prev-link') && [
          this.#element.getAttribute('data-pagination-prev-link')!,
        ]) ||
        undefined

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

      const paginatedElement = this.#getPaginatedElement(
        this.#element.getAttribute('data-pagination-set-link') ||
          this.#element.getAttribute('data-pagination-more-link') ||
          this.#element.getAttribute('data-pagination-next-link') ||
          this.#element.getAttribute('data-pagination-prev-link')
      )

      if (paginatedElement) {
        if (this.#element.hasAttribute('data-pagination-set-link')) {
          this.#morph.links.forEach((link) => {
            link.updatePagination(
              parseInt(this.#element.getAttribute('data-value') || '1'),
              paginatedElement.selector
            )
          })
        } else if (this.#element.hasAttribute('data-pagination-prev-link')) {
          this.#morph.links.forEach((link) => {
            link.updatePagination(
              paginatedElement.currentPage - 1,
              paginatedElement.selector
            )
          })
        } else if (this.#element.hasAttribute('data-pagination-next-link')) {
          this.#morph.links.forEach((link) => {
            link.updatePagination(
              paginatedElement.currentPage + 1,
              paginatedElement.selector
            )
          })
        } else if (this.#element.hasAttribute('data-pagination-more-link')) {
          this.#morph.links.forEach((link) => {
            link.updatePagination(
              paginatedElement.currentPage + 1,
              paginatedElement.selector
            )
          })
        }
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
        submorphAppend: this.#element.hasAttribute('data-pagination-more-link'),
        mergeParams:
          this.#element.hasAttribute('data-merge-params') &&
          !this.#element.hasAttribute('data-toggle-params'),
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
