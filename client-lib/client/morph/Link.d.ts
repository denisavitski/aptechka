import { Morph } from './Morph';

export declare class Link {
    #private;
    constructor(element: HTMLAnchorElement, morph: Morph);
    destroy(): void;
}
