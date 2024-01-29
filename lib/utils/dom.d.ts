export declare function findParentElement<T extends typeof Element>(element: Element | null, Constructor: T): T | null;
export type ElementOrSelector<T extends HTMLElement = HTMLElement> = string | T;
export declare function getElement<T extends HTMLElement>(elementOrSelector: ElementOrSelector<T>, from?: Document): T | null;
export declare function findScrollParentElement(node: Node | null, _initial?: Node | null): HTMLElement;
