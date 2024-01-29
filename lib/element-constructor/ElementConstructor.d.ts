import { Store } from '../store';
export type ElementConstructorTagNameMap = HTMLElementTagNameMap & SVGElementTagNameMap;
export type ElementConstructorTagNames = keyof ElementConstructorTagNameMap;
export type ElementConstructorStringStoreClass = Store<string | null | undefined> | Store<string>;
export type ElementConstructorStringArrayStoreClass = Store<Array<string | null | undefined>> | Store<Array<string>>;
export type ElementConstructorClass = string | Array<string | ElementConstructorStringStoreClass | ElementConstructorStringArrayStoreClass> | ElementConstructorStringStoreClass | ElementConstructorStringArrayStoreClass | {
    [key: string]: boolean | Store<boolean>;
};
export type ElementConstructorStyleToken = Exclude<Extract<keyof CSSStyleDeclaration, string> | `--${string}`, 'length' | 'parentRule'>;
export type ElementConstructorStyleValue = string | Store<string | null | undefined> | Store<string>;
export type ElementConstructorStyle = Partial<{
    [K in ElementConstructorStyleToken]: ElementConstructorStyleValue;
}>;
export type ElementConstructorJSSWrapper = {
    [key: string]: object | ElementConstructorStyle;
};
export type ElementConstructorJSS = ElementConstructorStyle | {
    [key: string]: ElementConstructorJSSWrapper | ElementConstructorStyle;
};
export type ElementConstructorEventMap = HTMLElementEventMap & SVGElementEventMap;
export type ElementConstructorEventNames = keyof ElementConstructorEventMap;
export type ElementConstructorEventValue<E extends Event> = {
    callback: (event: E) => void;
    options?: AddEventListenerOptions;
} | ((event: E) => void);
export type ElementConstructorEvents = Partial<{
    [EventName in ElementConstructorEventNames | `custom:${string}`]: EventName extends ElementConstructorEventNames ? ElementConstructorEventValue<HTMLElementEventMap[EventName]> : ElementConstructorEventValue<CustomEvent>;
}>;
export type ElementConstructorNativeAttribute<TagName extends ElementConstructorTagNames, E = ElementConstructorTagNameMap[TagName]> = {
    [K in keyof E]: E[K] extends string ? K : never;
}[keyof E];
type ElementConstructorAttributeValue = string | undefined | null | boolean | number | Store<string> | Store<string | undefined | null> | Store<boolean> | Store<boolean | undefined | null> | Store<number> | Store<number | undefined | null>;
export type ElementConstructorNativeAttributes<T extends ElementConstructorTagNames> = Partial<{
    [K in ElementConstructorNativeAttribute<T>]: ElementConstructorAttributeValue;
}>;
export type ElementConstructorCustomAttributes = {
    [key: string]: ElementConstructorAttributeValue;
};
export type ElementConstructorAttributes<T extends ElementConstructorTagNames> = ElementConstructorNativeAttributes<T> | ElementConstructorCustomAttributes;
export type ElementConstructorPrimitiveChild = string | number | boolean | null | undefined;
export type ElementConstructorSimpleChild = ElementConstructorPrimitiveChild | ElementConstructor | Node | Array<ElementConstructorPrimitiveChild> | Array<ElementConstructor> | Array<Node>;
export type ElementConstructorStoreChild = Store<any>;
export type ElementConstructorStoreChildren = Store<Array<any>>;
export type ElementConstructorChildren = Array<ElementConstructorSimpleChild | ElementConstructorStoreChild | ElementConstructorStoreChildren>;
export type ElementConstructorParent = Node | ElementConstructor;
export type ElementConstructorCreatedCallback<TagName extends ElementConstructorTagNames> = (element: ElementConstructorTagNameMap[TagName]) => void;
export type ElementConstructorTagObject<TagName extends ElementConstructorTagNames> = {
    class?: ElementConstructorClass;
    style?: TagName extends 'style' ? ElementConstructorJSS : ElementConstructorStyle;
    events?: ElementConstructorEvents;
    attributes?: ElementConstructorAttributes<TagName>;
    children?: ElementConstructorChildren;
    shadowChildren?: ElementConstructorChildren;
    parent?: ElementConstructorParent;
    svg?: boolean;
    created?: ElementConstructorCreatedCallback<TagName>;
};
export type ElementConstructorObject = Partial<{
    [T in ElementConstructorTagNames]: ElementConstructorTagObject<T>;
}> | {
    [key: `${string}-${string}`]: ElementConstructorTagObject<'div'>;
};
export type ElementConstructorType = HTMLElement | SVGElement;
export declare class ElementConstructor<T extends ElementConstructorTagNames = ElementConstructorTagNames> {
    #private;
    constructor(object: ElementConstructorObject);
    constructor(value: string, object: ElementConstructorTagObject<T>);
    constructor(element: HTMLElement, object: ElementConstructorTagObject<T>);
    get rootElements(): ElementConstructorType[];
}
export declare function element(object: ElementConstructorObject): ElementConstructor;
export declare function element<T extends ElementConstructorTagNames = ElementConstructorTagNames>(value: string, object?: ElementConstructorTagObject<T>): ElementConstructor;
export declare function element(element: HTMLElement, object: ElementConstructorTagObject<any>): ElementConstructor;
export declare function elementFactory(object: ElementConstructorObject): () => ElementConstructor;
export declare function elementFactory(element: HTMLElement, object: ElementConstructorTagObject<any>): () => ElementConstructor;
export {};
