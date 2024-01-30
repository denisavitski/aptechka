import { CustomElement } from '../custom-element';
export declare class StudioElement extends CustomElement {
    constructor();
}
declare global {
    interface HTMLElementTagNameMap {
        'e-studio': StudioElement;
    }
}
