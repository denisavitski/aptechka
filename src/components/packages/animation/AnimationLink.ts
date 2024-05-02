import { StoreCallback, StoreOptions } from '@packages/store'
import { Animation, AnimationEntry, AnimationOptions } from './Animation'

export interface AnimationLinkOptions
  extends Omit<AnimationOptions, keyof StoreOptions<number>> {
  once?: boolean
}

export class AnimationLink<
  Entry extends AnimationEntry = AnimationEntry,
  Options extends AnimationLinkOptions = AnimationLinkOptions
> {
  #triggerAnimation: Animation<any, Entry>
  #targetAnimation: Animation<any, AnimationEntry>

  #startValue: number
  #setValue: number

  #isForward = false
  #isBack = false
  #isRunned = false

  #options: Options | undefined

  constructor(
    triggerAnimation: Animation<any, Entry>,
    targetAnimation: Animation<any, AnimationEntry>,
    startValue: number,
    setValue: number,
    options?: Options | undefined
  ) {
    this.#triggerAnimation = triggerAnimation
    this.#targetAnimation = targetAnimation

    this.#startValue = startValue
    this.#setValue = setValue

    this.#options = options

    this.#triggerAnimation.subscribe(this.#progressListener)
  }

  public get targetAnimation() {
    return this.#targetAnimation
  }

  public destroy() {
    this.#triggerAnimation.unsubscribe(this.#progressListener)
  }

  #startForward() {
    if (!this.#isForward) {
      this.#isBack = false
      this.#isForward = true

      this.#setAnimation(this.#setValue)
    }
  }

  #startBack() {
    if (this.#isForward && !this.#isBack) {
      this.#isForward = false
      this.#isBack = true

      this.#setAnimation(this.#targetAnimation.initial)
    }
  }

  #setAnimation(value: number) {
    this.#checkOnce()
    this.#targetAnimation.updateOptions(this.#options)
    this.#targetAnimation.set(value)
  }

  #checkOnce() {
    if (this.#options?.once) {
      this.destroy()
    }
  }

  #progressListener: StoreCallback<AnimationEntry> = (e) => {
    if (
      !this.#isRunned &&
      this.#triggerAnimation.initial !== this.#triggerAnimation.current
    ) {
      this.#isRunned = true
    }

    if (this.#isRunned) {
      if (e.progress !== 0 && e.progress >= this.#startValue) {
        this.#startForward()
      } else if (e.progress <= this.#startValue) {
        this.#startBack()
      }
    }
  }
}
