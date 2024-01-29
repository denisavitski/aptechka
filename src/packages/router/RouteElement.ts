import { CustomElement } from '$packages/custom-element'

export type RouteURLParams<T extends string = string> = Partial<{ [key in T]: string }>

export type RouteParameters<
  PathnameParams extends string = string,
  SearchParams extends string = string
> = {
  pathnameParams: RouteURLParams<PathnameParams>
  searchParams: RouteURLParams<SearchParams>
}

export class RouteElement<
  PathnameParams extends string = string,
  SearchParams extends string = string
> extends CustomElement {
  #pathnameParams: RouteURLParams<PathnameParams>
  #searchParams: RouteURLParams<SearchParams>

  constructor(parameters: RouteParameters<PathnameParams, SearchParams>) {
    super()

    this.#pathnameParams = parameters.pathnameParams
    this.#searchParams = parameters.searchParams
  }

  public get pathnameParams() {
    return this.#pathnameParams
  }

  public get searchParams() {
    return this.#searchParams
  }
}
