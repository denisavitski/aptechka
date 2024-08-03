export function encode(string: string) {
  const decodedStr = window.atob(string)
  // @ts-ignore
  return decodeURIComponent(window.escape(decodedStr))
}

export function decode(string: string) {
  // @ts-ignore
  const encodedStr = window.unescape(encodeURIComponent(string))
  return window.btoa(encodedStr)
}
