import { Plane } from 'three';
import { LayoutBox } from '../../layout-box';
import { ElementOrSelector } from '../../utils';
export declare class En3Clip {
    #private;
    constructor(elementOrSelector: ElementOrSelector<HTMLElement>, scale?: number);
    get planes(): Plane[];
    get layoutBox(): LayoutBox;
    destroy(): void;
}
