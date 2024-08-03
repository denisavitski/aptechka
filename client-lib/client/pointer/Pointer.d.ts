import { Damped, DampedOptions } from '../animation';
import { ElementOrSelector } from '../utils';

export interface PointerParameters {
    element: ElementOrSelector<HTMLElement>;
    damped?: DampedOptions;
    cartesian?: boolean;
    normalize?: boolean;
}
export declare class Pointer {
    #private;
    constructor(parameters: PointerParameters);
    get element(): HTMLElement;
    get x(): Damped;
    get y(): Damped;
    get z(): Damped;
    get cartesian(): boolean;
    set cartesian(value: boolean);
    get normalize(): boolean;
    set normalize(value: boolean);
    connect(): void;
    disconnect(): void;
}
