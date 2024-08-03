import { TickerAddOptions } from '../ticker';
import { Controls } from './Controls';

export interface AutoplayControlsOptions extends TickerAddOptions {
    speed?: number;
    interval?: boolean;
}
export declare class AutoplayControls extends Controls {
    #private;
    direction: number;
    constructor(options?: AutoplayControlsOptions);
    set interval(value: boolean);
    set speed(value: number);
    connect(): void;
    disconnect(): void;
    pauseAndContinue(duration: number): void;
}
