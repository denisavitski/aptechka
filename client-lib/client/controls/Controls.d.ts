import { Notifier } from '../notifier';

export type ControlsCallback = (type: string, value: number) => void;
export declare abstract class Controls {
    #private;
    get changeEvent(): Notifier<ControlsCallback>;
    abstract connect(): void;
    abstract disconnect(): void;
}
