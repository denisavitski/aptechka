import { Notifier } from '../notifier';
export type ResizerCallback = () => void;
export declare const dispatchResizeEvent: (cause?: any) => void;
declare class Resizer extends Notifier<ResizerCallback> {
    #private;
    constructor();
    subscribe(callback: ResizerCallback, order?: number): () => void;
}
export declare const resizer: Resizer;
export {};
