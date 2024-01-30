import { Notifier } from '@packages/notifier'

export type ControlsValue = number | 'max' | 'min'
export type ControlsCallback = (value: ControlsValue) => void

export abstract class Controls {
  #changeEvent = new Notifier<ControlsCallback>()

  public get changeEvent() {
    return this.#changeEvent
  }

  public abstract connect(): void
  public abstract disconnect(): void
}
