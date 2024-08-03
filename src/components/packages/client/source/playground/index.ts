import { SourceManager } from '../SourceManager'

console.log('Playground')

const m = new SourceManager({
  srcset: 'env.1mar.png',
})

m.subscribe((e) => {
  console.log(e.current?.url)
})

m.connect()
