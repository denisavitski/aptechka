import { Attribute } from '../attribute';
import { CustomElement } from '../custom-element';
import { Store } from '../store';
export declare class PopoverElement extends CustomElement {
    #private;
    private static __opened;
    get history(): Attribute<false>;
    get single(): Attribute<false>;
    get opened(): Store<boolean, keyof import('../store').StoreManagers, import('../store').StoreEntry<boolean>>;
    open: () => void;
    close: () => void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-popover': PopoverElement;
    }
}
