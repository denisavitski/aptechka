export declare function define(name: string, extend?: keyof HTMLElementTagNameMap): (Constructor: CustomElementConstructor) => void;
declare const HTMLElement: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
export declare class CustomElement extends HTMLElement {
    openShadow(...stylesheets: Array<CSSStyleSheet>): ShadowRoot;
    addStylesheet(...stylesheets: Array<CSSStyleSheet>): void;
}
export {};
