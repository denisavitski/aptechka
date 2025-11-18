export function useRef<T>() {
  const ref: JSX.Ref<T> = { value: null! }

  return ref
}
