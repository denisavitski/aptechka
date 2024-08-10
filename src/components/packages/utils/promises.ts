export function wait(dur: number) {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res()
    }, dur)
  })
}
