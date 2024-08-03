export function createRef<T>(value: T) {
  return {
    current: value,
  }
}
