export function splitPath(value: string, base = '') {
  base = base.endsWith('/') ? base.slice(0, -1) : base

  value = value.replace(base, '')

  if (value.startsWith('/')) {
    value = value.slice(1)
  }

  const split1 = value.split('#')
  const split2 = split1[0].split('?')

  let leaf = !split2[0].startsWith('/') ? '/' + split2[0] : split2[0]
  leaf = leaf.endsWith('/') && leaf !== '/' ? leaf.slice(0, -1) : leaf
  const pathname = base + leaf
  const parameters = split2?.[1]
  const hash = split1?.[1]

  return {
    leaf,
    pathname,
    parameters,
    hash,
  }
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

export function changeHistory(
  action: ChangeHistoryAction,
  pathname: string,
  parameters?: string | undefined,
  hash?: string | undefined
) {
  const por = parameters || location.search

  const h = hash ? (hash.startsWith('#') ? hash : '#' + hash) : ''
  const p = por ? (por.startsWith('?') ? por : '?' + por) : ''

  const pathPlus = `${pathname}${h}${p}`

  if (action === 'push') {
    history.pushState(null, '', pathPlus)
  } else if (action === 'replace') {
    history.replaceState(null, '', pathPlus)
  }
}
