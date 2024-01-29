import { LayoutBox } from '../../layout-box';
import { ElementOrSelector } from '../../utils';
import { Plane } from 'three';
export declare class En3Clip {
    #private;
    constructor(elementOrSelector: ElementOrSelector);
    get planes(): Plane[];
    get layoutBox(): LayoutBox;
    destroy(): void;
}
