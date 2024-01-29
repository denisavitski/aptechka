import { Axes2D } from '../utils';
import { Controls } from './Controls';
export interface WheelControlsOptions {
    axis?: Axes2D;
    speed?: number;
    debounce?: boolean;
    element?: HTMLElement;
}
export declare class WheelControls extends Controls {
    #private;
    axis: Axes2D;
    speed: number;
    debounce: boolean;
    constructor(options?: WheelControlsOptions);
    connect(): void;
    disconnect(): void;
}
