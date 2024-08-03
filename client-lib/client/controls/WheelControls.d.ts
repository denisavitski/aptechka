import { Axes2D } from '../utils';
import { Controls } from './Controls';

export type WheelControlsAxis = Axes2D | 'max';
export interface WheelControlsOptions {
    axis?: WheelControlsAxis;
    speed?: number;
    debounce?: boolean;
    element?: HTMLElement;
}
export declare class WheelControls extends Controls {
    #private;
    axis: WheelControlsAxis;
    speed: number;
    debounce: boolean;
    constructor(options?: WheelControlsOptions);
    connect(): void;
    disconnect(): void;
}
