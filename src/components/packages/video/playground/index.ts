import { loading } from '@packages/loading'

console.log('Playground')

console.log(loading)

loading.progressEvent.subscribe((e) => {
  console.log(e)
})
