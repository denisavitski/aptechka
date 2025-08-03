export function useRef<T>() {
  const ref: { current: T | null } = { current: null }

  return ref
}
