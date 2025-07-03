import { ChangeHistoryAction } from '@packages/utils'
import { Morph } from './Morph'
import { cssValueParser } from '@packages/css-value-parser'

export class MorphLink {
  #morph: Morph
  #element: HTMLAnchorElement
  #path: string

  constructor(element: HTMLAnchorElement, morph: Morph) {
    this.#morph = morph
    this.#element = element

    this.#element.addEventListener('click', this.#clickListener)

    this.#path = this.#element.getAttribute('href') || '/'
    this.checkCurrent(location.href.replace(location.origin, ''))

    const paginatedElement = this.#getPaginatedElement(
      this.#element.getAttribute('data-pagination-set-link') ||
        this.#element.getAttribute('data-pagination-more-link')
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

  #clickListener = (e: MouseEvent) => {
    e.preventDefault()

    if (document.documentElement.classList.contains('click-disabled')) {
      return
    }

    const back = this.#element.hasAttribute('data-back')

    if (back && this.#morph.previousURL) {
      history.back()
    } else {
      this.#path = this.#element.getAttribute('href') || '/'

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
        this.#element.hasAttribute('data-pagination-set-link')

      const keepSearchParameters = this.#element.hasAttribute(
        'data-keep-search-parameters'
      )

      const keepScrollPosition =
        this.#element.hasAttribute('data-keep-scroll-position') ||
        this.#element.hasAttribute('data-pagination-more-link')

      const scrollBehaviour = this.#element.getAttribute(
        'data-scroll-behaviour'
      ) as ScrollBehavior

      const paginatedElement = this.#getPaginatedElement(
        this.#element.getAttribute('data-pagination-set-link') ||
          this.#element.getAttribute('data-pagination-more-link')
      )

      if (paginatedElement) {
        if (this.#element.hasAttribute('data-pagination-set-link')) {
          this.#morph.links.forEach((link) => {
            link.updatePagination(
              parseInt(this.#element.getAttribute('data-value') || '1'),
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
        undefined

      const clearState = this.#element.hasAttribute('data-clear-state')

      this.#morph.navigate(this.#path, {
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
      })
    }
  }

  #pointerListener = () => {
    const revalidate = this.#element.hasAttribute('data-revalidate')
    this.#morph.prefetch(this.#path, revalidate)
    this.#element.removeEventListener('pointerenter', this.#pointerListener)
  }
}
