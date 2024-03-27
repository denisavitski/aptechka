import { ticker } from '..'

console.log('Playground')

ticker.subscribe(() => {
  console.log('AA')
})
