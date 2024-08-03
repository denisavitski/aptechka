import { Notifier } from '@packages/client/notifier'

export type ControlsCallback = (type: string, value: number) => void

export abstract class Controls {
  #changeEvent = new Notifier<ControlsCallback>()

  public get changeEvent() {
    return this.#changeEvent
  }

  public abstract connect(): void
  public abstract disconnect(): void
}
