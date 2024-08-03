import { En3Fluid } from './En3Fluid';

export declare class En3FluidElement extends HTMLElement {
    #private;
    get fluid(): En3Fluid;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-fluid': En3FluidElement;
    }
}
