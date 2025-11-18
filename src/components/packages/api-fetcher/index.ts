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

export async function apiFetcher<Params extends object = {}, Result = any>(
  input: string,
  options?: IAPIFetcherOptions<Params>,
): Promise<IAPIResponseJSON<Result>> {
  const startTime = Date.now()

  const baseResult: Omit<IAPIResponseJSON<Result>, 'time'> = {
    data: null,
    error: null,
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

    const cacheKey = options?.cacheKey ?? url
    const cacheTTL = options?.cacheTTLMinutes ?? 0
    const cacheAllowed = cacheTTL > 0

    if (options?.forceClearCache || (globalThis as any).forceClearCache) {
      apiFetcherCache.delete(cacheKey)
      pendingRequests.delete(cacheKey)
    }

    // Проверяем кеш данных
    if (cacheAllowed) {
      const cached = apiFetcherCache.get(cacheKey) as Result
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
            error: errorText,
            status: 'error',
            time: Date.now() - startTime,
            response: response,
          }
        }

        const contentType = response.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
          return {
            ...baseResult,
            error: 'Endpoint did not return JSON',
            status: 'error',
            time: Date.now() - startTime,
            response: response,
          }
        }

        const jsonData = await response.json()

        if (cacheAllowed) {
          apiFetcherCache.set(cacheKey, jsonData, cacheTTL)
        }

        return {
          ...baseResult,
          data: jsonData,
          status: 'success',
          time: Date.now() - startTime,
          response: response,
        }
      } finally {
        // Удаляем запрос из pending после завершения (успешного или с ошибкой)
        pendingRequests.delete(cacheKey)
      }
    })()

    pendingRequests.set(cacheKey, requestPromise)

    return await requestPromise
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
