export declare function findParentElement<T extends CustomElementConstructor>(element: Element | null, Constructor: T): InstanceType<T> | null;
export type ElementOrSelector<T extends Element = Element> = string | T;
export declare function getElement<T extends Element>(elementOrSelector: ElementOrSelector<T> | undefined, from?: Document): T | null | undefined;
export declare function findScrollParentElement(node: Node | null, _initial?: Node | null): HTMLElement;
