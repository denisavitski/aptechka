import { LayoutBox } from '../../layout-box';
import { ElementOrSelector } from '../../utils';
import { Plane } from 'three';

export interface En3ClipOptions {
    viewName?: string;
    scale?: number;
}
export declare class En3Clip {
    #private;
    constructor(elementOrSelector: ElementOrSelector<HTMLElement>, options?: En3ClipOptions);
    get planes(): Plane[];
    get layoutBox(): LayoutBox;
    destroy(): void;
}
