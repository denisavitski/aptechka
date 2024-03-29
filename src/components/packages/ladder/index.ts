import { Store } from '@packages/store'
import { TickerCallback, ticker } from '@packages/ticker'
import { damp, preciseNumber } from '@packages/utils'

export type LadderDefaultStepName = number | string

export type LadderOperation = '+' | '*' | '/' | '-'

export type LadderSteps<
  K,
  T extends LadderDefaultValueType = LadderDefaultValueType
> = Map<K, LadderStep<T>>

export type LadderDefaultValueType = { [key: string]: number }

interface LadderStepParameters<
  T extends LadderDefaultValueType = LadderDefaultValueType
> {
  operation: LadderOperation
  value: T
  damping?: number
}

class LadderStep<T extends LadderDefaultValueType = LadderDefaultValueType> {
  #operation: LadderOperation
  #value: T
  #targetValue: T
  #damping: number

  constructor(parameters: LadderStepParameters<T>) {
    this.#operation = parameters.operation
    this.#value = parameters.value
    this.#targetValue = this.#value
    this.#damping = parameters.damping || 0
  }

  public get operation() {
    return this.#operation
  }

  public get value() {
    return this.#value
  }

  public set value(value: T) {
    this.#targetValue = value

    if (!this.#damping) {
      this.#value = value
    }
  }

  public get damping() {
    return this.#damping
  }

  public set damping(value: number) {
    this.#damping = value
  }

  public update(elapsed: number) {
    let needUpdate = 0

    for (const key in this.#value) {
      this.#value[key] = damp(
        this.#value[key],
        this.#targetValue[key],
        this.damping,
        elapsed
      ) as any

      if (
        preciseNumber(this.#value[key], 4) !==
        preciseNumber(this.#targetValue[key], 4)
      ) {
        needUpdate++
      }
    }

    return needUpdate === 0
  }
}

export class Ladder<
  V extends LadderDefaultValueType = LadderDefaultValueType,
  K extends LadderDefaultStepName = LadderDefaultStepName
> extends Store<V> {
  #base: V
  #steps: LadderSteps<K, V>
  #bindings: Set<V>

  constructor(base: V) {
    super(base, {
      equalityCheck: () => false,
    })

    this.#base = { ...base }
    this.#steps = new Map()
    this.#bindings = new Set()
  }

  public get base() {
    return this.#base
  }

  public get steps() {
    return this.#steps
  }

  public override close() {
    super.close()
    this.#bindings.clear()
    this.#steps.clear()
    ticker.unsubscribe(this.#tickListener)
  }

  public bind(sub: V) {
    this.#bindings.add(sub)
  }

  public unbind(sub: V) {
    this.#bindings.delete(sub)
  }

  public deleteStep(stepName: K) {
    this.steps.delete(stepName)
  }

  public getStepValue(stepName: K) {
    return this.steps.get(stepName)!.value
  }

  public setStep(
    stepName: K,
    operation: LadderOperation,
    setValue: Partial<V>,
    damping?: number
  ) {
    const value = {} as V

    for (const key in this.current) {
      ;(value[key] as any) = setValue[key] || 0
    }

    let step = this.steps.get(stepName)

    if (!step) {
      step = new LadderStep({ operation, value: { ...this.#base }, damping })
      this.steps.set(stepName, step)
    }

    step.damping = damping || 0
    step.value = value

    this.#checkSteps()
  }

  public calculate() {
    const calculated = {} as V

    for (const key in this.base) {
      calculated[key] = this.base[key]
    }

    for (const item of this.steps) {
      const step = item[1]

      if (step.operation === '+') {
        for (const key in this.base) {
          const value = step.value[key] as number
          ;(calculated[key] as any) += value
        }
      } else if (step.operation === '*') {
        for (const key in this.base) {
          const value = step.value[key] as number
          ;(calculated[key] as any) *= value
        }
      } else if (step.operation === '/') {
        for (const key in this.base) {
          const value = step.value[key] as number
          ;(calculated[key] as any) /= value
        }
      } else if (step.operation === '-') {
        for (const key in this.base) {
          const value = step.value[key] as number
          ;(calculated[key] as any) -= value
        }
      }
    }

    for (const sub of this.#bindings) {
      for (const key in calculated) {
        sub[key] = calculated[key]
      }
    }

    this.current = calculated
  }

  #checkSteps() {
    let dampedSteps = false

    this.#steps.forEach((step) => {
      if (step.damping) {
        dampedSteps = true
      }
    })

    if (dampedSteps) {
      ticker.subscribe(this.#tickListener)
    } else {
      ticker.unsubscribe(this.#tickListener)
    }
  }

  #tickListener: TickerCallback = (e) => {
    let needUpdate = 0

    for (const item of this.steps) {
      const step = item[1]
      const done = step.update(e.elapsed)
      needUpdate += done ? 0 : 1
    }

    this.calculate()

    if (!needUpdate) {
      ticker.unsubscribe(this.#tickListener)
    }
  }
}
