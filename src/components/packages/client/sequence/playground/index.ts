import { Damped, Tweened } from '@packages/client/animation'
import { loading } from '@packages/client/loading'
import { easeInOutCubic, linear } from '@packages/client/utils'

const tween = new Damped(0, {})

const seq = document.querySelector('e-sequence')

tween.subscribe((e) => {
  seq?.setProgress(e.current)
})

loading.progressEvent.subscribe((v) => {
  console.log(v)
})
