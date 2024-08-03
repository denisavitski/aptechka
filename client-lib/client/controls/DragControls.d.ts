import { Axes2D } from '../utils';
import { Controls } from './Controls';

export interface DragControlsOptions {
    element?: HTMLElement;
    axis?: Axes2D;
    swipe?: boolean;
}
export declare class DragControls extends Controls {
    #private;
    axis: Axes2D;
    swipe: boolean;
    constructor(options?: DragControlsOptions);
    connect(): void;
    disconnect(): void;
}
