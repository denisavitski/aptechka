import { Controls } from './Controls';

export type KeyboardControlsDimension = 'height' | 'width';
export interface KeyboardControlsOptions {
    element?: HTMLElement;
    dimension?: KeyboardControlsDimension;
}
export declare class KeyboardControls extends Controls {
    #private;
    constructor(options?: KeyboardControlsOptions);
    set dimension(value: KeyboardControlsDimension | undefined | null);
    connect(): void;
    disconnect(): void;
}
