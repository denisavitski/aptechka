import { CustomElement } from '../custom-element';
import { Attribute } from '../attribute';
import { Axes2D } from '../utils';
export interface AccordionItemToggleEventDetail {
    opened: boolean;
}
export interface AccordionToggleOptions {
    skipTransition?: boolean;
    exclude?: HTMLElement;
}
export declare class AccordionElement extends CustomElement {
    #private;
    constructor();
    get axisAttribute(): Attribute<Axes2D>;
    get multipleAttribute(): Attribute<false>;
    createItem(element: HTMLElement): void;
    removeItem(element: HTMLElement): void;
    closeAll(options?: AccordionToggleOptions): void;
    openAll(options?: AccordionToggleOptions): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-accordion': AccordionElement;
    }
    interface HTMLElementEventMap {
        accordionItemToggle: CustomEvent<AccordionItemToggleEventDetail>;
    }
}
