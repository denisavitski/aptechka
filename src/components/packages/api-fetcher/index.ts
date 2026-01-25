import { Cache } from '@packages/cache'
import { searchParamsObjectToString } from '@packages/utils'

export interface IAPIFetcherOptions<Params extends object = {}> {
  init?: RequestInit
  cacheKey?: string
  cacheTTLMinutes?: number
  forceClearCache?: boolean
  params?: Params
}

export interface IAPIResponseJSON<T = null> {
  status: 'success' | 'unknown' | 'error'
  data: T | null
  errors: Array<string>
  time: number
  cached?: boolean
  response: Response
}

export const apiFetcherCache = new Cache()

const pendingRequests = new Map<string, Promise<IAPIResponseJSON<any>>>()

export function apiFetcherClearPendingRequests() {
  pendingRequests.clear()
}

export function apiFetcherGetPendingRequestsCount() {
  return pendingRequests.size
}

function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) return {}

  if (headers instanceof Headers) {
    return Object.fromEntries(
      Array.from(headers.entries()).sort(([a], [b]) => a.localeCompare(b)),
    )
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(
      [...headers].sort(([a], [b]) => a.localeCompare(b)),
    )
  }

  return Object.fromEntries(
    Object.entries(headers).sort(([a], [b]) => a.localeCompare(b)),
  )
}

function buildCacheKey(baseKey: string, init?: RequestInit): string {
  const method = (init?.method || 'GET').toUpperCase()
  const headers = normalizeHeaders(init?.headers)

  return `${baseKey}::${method}::${JSON.stringify(headers)}`
}

export async function apiFetcher<Result = any, Params extends object = {}>(
  input: string,
  options?: IAPIFetcherOptions<Params>,
): Promise<IAPIResponseJSON<Result>> {
  const startTime = Date.now()

  const baseResult: Omit<IAPIResponseJSON<Result>, 'time'> = {
    data: null,
    errors: [],
    status: 'unknown',
    response: new Response(),
  }

  try {
    let url = input

    if (options?.params) {
      const params = searchParamsObjectToString(options.params)
      if (params) {
        const separator = url.includes('?') ? '&' : '?'
        url += `${separator}${params}`
      }
    }

    const baseCacheKey = options?.cacheKey ?? url
    const cacheKey = buildCacheKey(baseCacheKey, options?.init)

    const cacheTTL = options?.cacheTTLMinutes ?? 0
    const cacheAllowed = cacheTTL > 0

    if (options?.forceClearCache || (globalThis as any).forceClearCache) {
      apiFetcherCache.delete(cacheKey)
      pendingRequests.delete(cacheKey)
    }

    if (cacheAllowed) {
      const cached = apiFetcherCache.get(cacheKey) as any

      if (cached) {
        return {
          ...baseResult,
          errors: cached.error
            ? [cached.error]
            : cached.errors
              ? cached.errors
              : baseResult.errors,
          data: cached.data || cached,
          cached: true,
          status: 'success',
          time: Date.now() - startTime,
        }
      }
    }

    const pendingRequest = pendingRequests.get(cacheKey)
    if (pendingRequest) {
      return pendingRequest
    }

    const requestPromise = (async (): Promise<IAPIResponseJSON<Result>> => {
      try {
        const response = await fetch(url, options?.init)

        if (!response.ok) {
          const errorText = await response.text()
          return {
            ...baseResult,
            errors: [errorText],
            status: 'error',
            time: Date.now() - startTime,
            response,
          }
        }

        const contentType = response.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
          return {
            ...baseResult,
            errors: ['Endpoint did not return JSON'],
            status: 'error',
            time: Date.now() - startTime,
            response,
          }
        }

        const jsonData = await response.json()

        if (cacheAllowed) {
          apiFetcherCache.set(cacheKey, jsonData, cacheTTL)
        }

        return {
          ...baseResult,
          errors: jsonData.error
            ? [jsonData.error]
            : jsonData.errors
              ? jsonData.errors
              : baseResult.errors,
          data: jsonData.data || jsonData,
          status: 'success',
          time: Date.now() - startTime,
          response,
        }
      } finally {
        pendingRequests.delete(cacheKey)
      }
    })()

    pendingRequests.set(cacheKey, requestPromise)

    return await requestPromise
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)

    return {
      ...baseResult,
      errors: [errorMessage],
      status: 'error',
      time: Date.now() - startTime,
    }
  }
}
