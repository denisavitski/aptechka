import { ScrollUserElement } from './ScrollUserElement';

export declare abstract class ScrollButtonElement extends ScrollUserElement {
    constructor();
    protected abstract handleClick(): void;
}
