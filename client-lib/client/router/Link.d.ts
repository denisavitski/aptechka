import { Router } from './Router';

export declare class Link {
    #private;
    constructor(router: Router, element: HTMLElement);
    destroy(): void;
}
