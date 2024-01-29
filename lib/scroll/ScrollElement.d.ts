import { Damped } from '../animation';
import { Attribute } from '../attribute';
import { CustomElement } from '../custom-element';
import { Store } from '../store';
import { Axes2D } from '../utils';
export type ScrollBehaviour = 'smooth' | 'instant';
export declare class ScrollElement extends CustomElement {
    #private;
    constructor();
    get currentScrollValue(): number;
    get targetScrollValue(): number;
    get damped(): Damped;
    get dampedAttibute(): Damped;
    get axisAttibute(): Attribute<Axes2D>;
    get pagesAttibute(): Attribute<number>;
    get sectionalAttibute(): Attribute<boolean>;
    get infiniteAttribute(): Attribute<boolean>;
    get splitAttibute(): Attribute<boolean>;
    get dampingAttibute(): Attribute<number>;
    get disabledAttibute(): Attribute<boolean>;
    get hibernatedAttibute(): Attribute<boolean>;
    get position(): number;
    get viewportSize(): number;
    get scrollSize(): number;
    get counter(): Store<number, import('../store').StoreEntry<number>>;
    get distance(): number;
    get overscroll(): number;
    get vertical(): boolean;
    get currentProgress(): number;
    get targetProgress(): number;
    scrollToSection(sectionIndex: number, behaviour?: ScrollBehaviour): void;
    shiftSections(direction: number, behaviour?: ScrollBehaviour): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-scroll': ScrollElement;
    }
}
