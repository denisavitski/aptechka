import { Attribute } from '../attribute';
import { Store } from '../store';

export declare class PopoverElement extends HTMLElement {
    #private;
    private static __opened;
    constructor();
    get history(): Attribute<false>;
    get single(): Attribute<false>;
    get opened(): Store<boolean, keyof import('../store').StoreManagers>;
    open: (useTransition?: boolean) => void;
    close: () => void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-popover': PopoverElement;
    }
    interface HTMLElementEventMap {
        popoverTriggered: CustomEvent;
        popoverOpened: CustomEvent;
        popoverClosing: CustomEvent;
        popoverClosed: CustomEvent;
    }
}
