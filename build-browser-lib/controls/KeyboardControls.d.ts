import { Controls } from './Controls';
export interface KeyboardControlsOptions {
    element?: HTMLElement;
}
export declare class KeyboardControls extends Controls {
    #private;
    constructor(options?: KeyboardControlsOptions);
    connect(): void;
    disconnect(): void;
}
