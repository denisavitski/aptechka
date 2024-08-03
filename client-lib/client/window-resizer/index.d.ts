import { Notifier } from '../notifier';

export type WindowResizerCallback = () => void;
export declare const dispatchWindowResizeEvent: (cause?: any) => void;
export declare class WindowResizer extends Notifier<WindowResizerCallback> {
    #private;
    constructor();
    subscribe(callback: WindowResizerCallback, order?: number): () => void;
}
export declare const windowResizer: WindowResizer;
