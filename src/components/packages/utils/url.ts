export interface SplitPathOptions {
  base?: string
  trailingSlash?: boolean
  mergeParams?: string
  removeParams?: string
}

export interface SplitPathResult {
  leaf: string
  pathname: string
  parameters: string
  hash: string
  path: string
}

export function splitPath(
  value: string,
  {
    base = '',
    trailingSlash = false,
    mergeParams,
    removeParams,
  }: SplitPathOptions = {},
) {
  base = base.endsWith('/') ? base.slice(0, -1) : base

  value = value.replace(base, '')

  if (value.startsWith('/')) {
    value = value.slice(1)
  }

  const split1 = value.split('#')
  const split2 = split1[0].split('?')

  let leaf = !split2[0].startsWith('/') ? '/' + split2[0] : split2[0]

  if (trailingSlash) {
    leaf = !leaf.endsWith('/') && leaf !== '/' ? leaf + '/' : leaf
  } else {
    leaf = leaf.endsWith('/') && leaf !== '/' ? leaf.slice(0, -1) : leaf
  }

  let parameters = split2[1] || ''

  if (mergeParams) {
    const existingParams = new URLSearchParams(parameters)
    const mergeParamsObj = new URLSearchParams(mergeParams)

    for (const [key, value] of mergeParamsObj) {
      if (!existingParams.has(key)) {
        existingParams.set(key, value)
      }
    }

    removeParams?.split(',').forEach((param) => {
      if (existingParams.has(param)) {
        existingParams.delete(param)
      }
    })

    parameters = existingParams.toString()
  }

  const pathname = base + leaf
  const hash = split1[1]
  const path = `${pathname}${parameters ? '?' + parameters : ''}${
    hash ? '#' + hash : ''
  }`

  const result: SplitPathResult = {
    leaf,
    pathname,
    parameters,
    hash,
    path,
  }

  return result
}

export function normalizeBase(base: string = '/') {
  if (!base.endsWith('/')) {
    base += '/'
  }

  if (!base.startsWith('/')) {
    base += '/'
  }

  return base
}

export type ChangeHistoryAction = 'replace' | 'push' | 'none'

export interface ChangeHistoryParameters {
  action: ChangeHistoryAction
  pathname: string
  searchParameters?: string | undefined
  hash?: string | undefined
  state?: { [key: string]: any }
}

export function changeHistory(p: ChangeHistoryParameters) {
  if (p.action === 'none') {
    return
  }

  const por = p?.searchParameters
  const hash = p.hash ? (p.hash.startsWith('#') ? p.hash : '#' + p.hash) : ''
  const searhParameters = por ? (por.startsWith('?') ? por : '?' + por) : ''
  const pathPlus = `${p.pathname}${searhParameters}${hash}`
  const hstate = { ...p.state, path: pathPlus }

  if (p.action === 'push') {
    history.pushState(hstate, '', pathPlus)
  } else if (p.action === 'replace') {
    history.replaceState(hstate, '', pathPlus)
  }
}

export function parseSearchParameters(search: string) {
  const params = new URLSearchParams(search)

  const values: {
    [key: string]: string
  } = {}

  for (const [key, value] of params) {
    ;(values as any)[key] = value
  }

  return values
}

export function updateSearchParameter(
  parameterName: string,
  value?: string | number,
) {
  const url = new URL(location.href)

  const v = value?.toString() || ''

  url.searchParams.set(parameterName, v)

  history.replaceState(history.state, '', url.href)
}

function updateURLAttr(el: Element, attr: string, base: string | URL) {
  el.setAttribute(attr, new URL(el.getAttribute(attr)!, base).pathname)
}

export function normalizeRelativeURLs(
  el: Element | Document,
  base: string | URL,
) {
  el.querySelectorAll('[href^="./"], [href^="../"]').forEach((item) =>
    updateURLAttr(item, 'href', base),
  )
  el.querySelectorAll('[src^="./"], [src^="../"]').forEach((item) =>
    updateURLAttr(item, 'src', base),
  )
}

export function normalizeURL(
  url: URL | string,
  {
    base = '',
    trailingSlash = false,
  }: { base?: string; trailingSlash?: boolean } = {},
) {
  base = base.replace(/^\/|\/$/g, '')

  const path =
    typeof url === 'string'
      ? url.replace(/^\/|\/$/g, '')
      : url.pathname.replace(/^\/|\/$/g, '')

  let urlString = ''

  if (!path.includes(base)) {
    urlString = `${base}/${path}`
  } else {
    urlString = `/${path}`
  }

  if (trailingSlash && !urlString.endsWith('/')) {
    urlString += '/'
  }

  return new URL(urlString, location.origin)
}

export function isLocalUrl(href: string) {
  try {
    const url = new URL(href)

    if (window.location.origin === url.origin) {
      if (url.pathname === window.location.pathname) {
        return !url.hash
      }

      return true
    }
  } catch (e) {}

  return false
}

export function searchParamsObjectToString(parameters?: {
  [key: string]: any
}) {
  if (!parameters) {
    return ''
  }

  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(parameters)) {
    if (
      value !== undefined &&
      value !== null &&
      value !== false &&
      value !== ''
    ) {
      params.append(key, String(value))
    }
  }

  return params.toString()
}

export function searchParamsToObject(params: URLSearchParams) {
  const object: { [key: string]: any } = {}

  for (const [key, value] of params.entries()) {
    if (value !== undefined && value !== null) {
      object[key] = value
    }
  }

  return object
}
