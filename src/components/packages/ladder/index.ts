import { Store } from '@packages/store'

export type LadderDefaultStepName = number | string

export type LadderOperation = '+' | '*' | '/' | '-'

export type LadderStep<T> = [LadderOperation, T]

export type LadderSteps<K, T> = Map<K, LadderStep<T>>

export type LadderDefaultValueType = { [key: string]: number }

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
    return this.steps.get(stepName)![1]
  }

  public setStep(stepName: K, action: LadderOperation, value: Partial<V>) {
    const readyValue = {} as V

    for (const key in this.current) {
      ;(readyValue[key] as any) = value[key] || 0
    }

    this.steps.set(stepName, [action, readyValue])
  }

  public calculate() {
    const calculated = {} as V

    for (const key in this.base) {
      calculated[key] = this.base[key]
    }

    for (const item of this.steps) {
      const step = item[1]

      if (step[0] === '+') {
        for (const key in this.base) {
          const value = step[1][key] as number
          ;(calculated[key] as any) += value
        }
      } else if (step[0] === '*') {
        for (const key in this.base) {
          const value = step[1][key] as number
          ;(calculated[key] as any) *= value
        }
      } else if (step[0] === '/') {
        for (const key in this.base) {
          const value = step[1][key] as number
          ;(calculated[key] as any) /= value
        }
      } else if (step[0] === '-') {
        for (const key in this.base) {
          const value = step[1][key] as number
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
}
