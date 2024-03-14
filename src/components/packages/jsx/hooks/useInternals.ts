import { useCreate } from './useCreate'

export function useInternals() {
  return useCreate((e) => {
    return e.attachInternals()
  })
}
