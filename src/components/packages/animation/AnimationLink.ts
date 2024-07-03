import { Store, StoreCallback, StoreOptions } from '@packages/store'
import { Animation, AnimationEntry, AnimationOptions } from './Animation'

export interface AnimationLinkOptions
  extends Omit<AnimationOptions, keyof StoreOptions<number>> {
  once?: boolean
}

export class AnimationLink<
  Options extends AnimationLinkOptions = AnimationLinkOptions
> {
  #triggerAnimation: Animation<any>
  #targetAnimation: Animation<any>

  #startValue: Store<number, 'number'>
  #setValue: Store<number, 'number'>

  #isForward = false
  #isBack = false
  #isRunned = false

  #options: Options | undefined

  constructor(
    triggerAnimation: Animation<any>,
    targetAnimation: Animation<any>,
    startValue: number,
    setValue: number,
    options?: Options | undefined
  ) {
    this.#triggerAnimation = triggerAnimation
    this.#targetAnimation = targetAnimation

    this.#startValue = new Store(startValue, {
      passport: targetAnimation.passport
        ? {
            name: targetAnimation.passport + '-start',
            manager: {
              type: 'number',
            },
          }
        : undefined,
    })
    this.#setValue = new Store(setValue, {
      passport: targetAnimation.passport
        ? {
            name: targetAnimation.passport + '-set',
            manager: {
              type: 'number',
            },
          }
        : undefined,
    })

    this.#options = options

    this.#triggerAnimation.subscribe(this.#progressListener)
    this.#triggerAnimation.linked.current = [
      ...this.#triggerAnimation.linked.current,
      this,
    ]
  }

  public get targetAnimation() {
    return this.#targetAnimation
  }

  public get triggerAnimation() {
    return this.#triggerAnimation
  }

  public destroy() {
    this.#setValue.close()
    this.#startValue.close()
    this.#triggerAnimation.unsubscribe(this.#progressListener)
    this.#triggerAnimation.linked.current =
      this.#triggerAnimation.linked.current.filter((l) => l !== this)
  }

  #startForward() {
    if (!this.#isForward) {
      this.#isBack = false
      this.#isForward = true

      this.#setAnimation(this.#setValue.current)
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
      if (e.direction > 0 && e.progress >= this.#startValue.current) {
        this.#startForward()
      } else if (e.direction < 0 && e.progress <= this.#startValue.current) {
        this.#startBack()
      }
    }
  }
}
