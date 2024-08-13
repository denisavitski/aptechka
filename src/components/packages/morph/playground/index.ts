import '@packages/media-elements'

import { Morph } from '../Morph'
import { wait } from '@packages/utils'

const morph = new Morph({
  base: '/components/packages/morph/playground/',
})

morph.preprocessor = async (v) => {
  await wait(1000)

  v.resolve()
}

addEventListener('loadingStart', (e) => {
  console.log('-----')
  console.log('loadingStart', JSON.stringify(e.detail))
})

addEventListener('loadingProgress', (e) => {
  console.log('loadingProgress', JSON.stringify(e.detail))
})

addEventListener('loadingComplete', (e) => {
  console.log('loadingComplete', JSON.stringify(e.detail))
})
