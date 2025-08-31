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
  error: string | null
  time: number
  cached?: boolean
  headers: Headers
}

const cache = new Cache()

export async function apiFetcher<Params extends object = {}, Result = any>(
  input: string,
  options?: IAPIFetcherOptions<Params>,
): Promise<IAPIResponseJSON<Result>> {
  const startTime = Date.now()

  const baseResult: Omit<IAPIResponseJSON<Result>, 'time'> = {
    data: null,
    error: null,
    status: 'unknown',
    headers: new Headers(),
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

    const cacheKey = options?.cacheKey ?? url
    const cacheTTL = options?.cacheTTLMinutes ?? 0
    const cacheAllowed = cacheTTL > 0

    if (options?.forceClearCache || (globalThis as any).forceClearCache) {
      cache.delete(cacheKey)
    }

    if (cacheAllowed) {
      const cached = cache.get(cacheKey) as Result
      if (cached) {
        return {
          ...baseResult,
          data: cached,
          cached: true,
          status: 'success',
          time: Date.now() - startTime,
        }
      }
    }

    const response = await fetch(url, options?.init)

    if (!response.ok) {
      const errorText = await response.text()
      return {
        ...baseResult,
        error: errorText,
        status: 'error',
        time: Date.now() - startTime,
        headers: response.headers,
      }
    }

    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return {
        ...baseResult,
        error: 'Endpoint did not return JSON',
        status: 'error',
        time: Date.now() - startTime,
        headers: response.headers,
      }
    }

    const jsonData = await response.json()

    if (cacheAllowed) {
      cache.set(cacheKey, jsonData, cacheTTL)
    }

    return {
      ...baseResult,
      data: jsonData,
      status: 'success',
      time: Date.now() - startTime,
      headers: response.headers,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)

    return {
      ...baseResult,
      error: errorMessage,
      status: 'error',
      time: Date.now() - startTime,
    }
  }
}
