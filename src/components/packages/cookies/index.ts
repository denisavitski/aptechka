interface CookiesClientOptions {
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  httpOnly?: boolean // недоступно на клиенте
}

export class CookiesClient {
  public static set(
    name: string,
    value: string,
    options: CookiesClientOptions = {},
  ): void {
    const encodedValue = encodeURIComponent(value)
    let cookieStr = `${name}=${encodedValue}`

    if (options.maxAge) {
      const expires = new Date(Date.now() + options.maxAge * 1000)
      cookieStr += `; Expires=${expires.toUTCString()}`
      cookieStr += `; Max-Age=${options.maxAge}`
    } else if (options.expires) {
      cookieStr += `; Expires=${options.expires.toUTCString()}`
    }

    if (options.path) cookieStr += `; Path=${options.path}`
    if (options.domain) cookieStr += `; Domain=${options.domain}`
    if (options.secure) cookieStr += '; Secure'
    if (options.sameSite) cookieStr += `; SameSite=${options.sameSite}`

    document.cookie = cookieStr
  }

  public static has(name: string): boolean {
    const cookies = document.cookie.split('; ')

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=')
      if (cookieName === name) {
        return true
      }
    }

    return false
  }

  public static get(name: string): string | null {
    const cookies = document.cookie.split('; ')
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=')
      if (cookieName === name) {
        return decodeURIComponent(cookieValue)
      }
    }
    return null
  }

  public static getAll(): Record<string, string> {
    return document.cookie
      .split('; ')
      .reduce((cookies: Record<string, string>, cookie) => {
        const [name, value] = cookie.split('=')
        if (name) {
          cookies[name] = decodeURIComponent(value)
        }
        return cookies
      }, {})
  }

  public static remove(
    name: string,
    options: Pick<CookiesClientOptions, 'path' | 'domain'> = {},
  ): void {
    this.set(name, '', {
      ...options,
      maxAge: -1,
    })
  }

  public static serialize(
    name: string,
    value: string,
    options: CookiesClientOptions = {},
  ): string {
    const encodedValue = encodeURIComponent(value)
    let cookieStr = `${name}=${encodedValue}`

    if (options.maxAge) {
      const expires = new Date(Date.now() + options.maxAge * 1000)
      cookieStr += `; Expires=${expires.toUTCString()}`
      cookieStr += `; Max-Age=${options.maxAge}`
    } else if (options.expires) {
      cookieStr += `; Expires=${options.expires.toUTCString()}`
    }

    if (options.path) cookieStr += `; Path=${options.path}`
    if (options.domain) cookieStr += `; Domain=${options.domain}`
    if (options.secure) cookieStr += '; Secure'
    if (options.sameSite) cookieStr += `; SameSite=${options.sameSite}`

    return cookieStr
  }
}
