import { Notifier } from '@packages/notifier'

export type ControlsCallback = (type: string, value: number, event: any) => void

export abstract class Controls {
  #changeEvent = new Notifier<ControlsCallback>()

  public get changeEvent() {
    return this.#changeEvent
  }

  public abstract connect(): void
  public abstract disconnect(): void
}
