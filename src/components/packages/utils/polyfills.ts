export function nullishCoalescing<D, V = D>(value: V, defaultValue: D) {
  return typeof value === 'undefined' ? defaultValue : value
}
