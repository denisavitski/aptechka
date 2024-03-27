import { Notifier } from '../notifier';
export type ControlsValue = number | 'max' | 'min';
export type ControlsCallback = (value: ControlsValue) => void;
export declare abstract class Controls {
    #private;
    get changeEvent(): Notifier<ControlsCallback>;
    abstract connect(): void;
    abstract disconnect(): void;
}
