import { Damped, Tweened } from '@packages/animation'
import { easeInOutCubic, linear } from '@packages/utils'

const tween = new Damped(0, {})

const seq = document.querySelector('e-sequence')

tween.subscribe((e) => {
  seq?.setProgress(e.current)
})
