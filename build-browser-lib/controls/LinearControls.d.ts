import { Controls } from './Controls';
export interface LinearControlsOptions {
    speed?: number;
}
export declare class LinearControls extends Controls {
    #private;
    speed: number;
    constructor(options?: LinearControlsOptions);
    connect(): void;
    disconnect(): void;
}
