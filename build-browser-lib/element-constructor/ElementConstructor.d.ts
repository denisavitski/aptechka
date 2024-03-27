import { Store } from '../store';
import { SplitFirst } from '../utils';
import { ConnectorConnectCallback, ConnectorDisconnectCallback } from '../connector';
export type ElementConstructorTagNameMap = HTMLElementTagNameMap & SVGElementTagNameMap;
export type ElementConstructorTagNames = keyof ElementConstructorTagNameMap;
export type ElementConstructorStringStoreClass = Store<string | null | undefined> | Store<string>;
export type ElementConstructorStringArrayStoreClass = Store<Array<string | null | undefined>> | Store<Array<string>>;
export type ElementConstructorClass = string | Array<string | ElementConstructorStringStoreClass | ElementConstructorStringArrayStoreClass> | ElementConstructorStringStoreClass | ElementConstructorStringArrayStoreClass | {
    [key: string]: boolean | Store<boolean>;
};
export type ElementConstructorStyleToken = Exclude<Extract<keyof CSSStyleDeclaration, string> | `--${string}`, 'length' | 'parentRule'>;
export type ElementConstructorStyleValue = string | Store<any>;
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
export type ElementConstructorNativeAttribute<T extends ElementConstructorTagNames | Node = ElementConstructorTagNames, E = T extends ElementConstructorTagNames ? ElementConstructorTagNameMap[T] : Node> = {
    [K in keyof E]: E[K] extends string | null ? K : never;
}[keyof E];
export type ElementConstructorNativeAttributes<T extends ElementConstructorTagNames | Node = ElementConstructorTagNames> = Partial<{
    [K in ElementConstructorNativeAttribute<T>]: any;
}>;
export type ElementConstructorCustomAttributes = {
    [key: string]: any;
};
export type ElementConstructorAttributes<T extends ElementConstructorTagNames | Node = ElementConstructorTagNames> = ElementConstructorNativeAttributes<T> | ElementConstructorCustomAttributes;
export type ElementConstructorParent = Node | ElementConstructor;
export type ElementConstructorRefCallback<T extends ElementConstructorTagNames | Node = ElementConstructorTagNames> = (element: T extends ElementConstructorTagNames ? ElementConstructorTagNameMap[T] : Node) => void;
export type ElementConstructorRef<T extends ElementConstructorTagNames | Node = ElementConstructorTagNames> = {
    current: T extends ElementConstructorTagNames ? ElementConstructorTagNameMap[T] : Node;
};
export type ElementConstructorEventValue<E extends Event> = {
    callback: (event: E) => void;
    options?: AddEventListenerOptions;
} | ((event: E) => void);
export type ElementConstructorEvents = Partial<{
    [K in `on${Capitalize<keyof ElementConstructorEventMap>}`]: ElementConstructorEventValue<ElementConstructorEventMap[Extract<Uncapitalize<SplitFirst<K, 'on'>[1]>, keyof ElementConstructorEventMap>]>;
}>;
export type ElementConstructorTagObject<T extends ElementConstructorTagNames | Node = ElementConstructorTagNames> = {
    class?: ElementConstructorClass;
    style?: T extends 'style' ? ElementConstructorJSS : ElementConstructorStyle;
    children?: any;
    ref?: ElementConstructorRefCallback<T> | ElementConstructorRef<T>;
    forceSvg?: boolean;
    lightChildren?: any;
    onDisconnect?: ConnectorDisconnectCallback;
    onConnect?: ConnectorConnectCallback;
} & ElementConstructorAttributes<T> & ElementConstructorEvents;
export declare class ElementConstructor<T extends ElementConstructorTagNames | Node = ElementConstructorTagNames, N = T extends ElementConstructorTagNames ? ElementConstructorTagNameMap[T] : Node> {
    #private;
    constructor(value: T, object?: ElementConstructorTagObject<T>);
    constructor(value: string, object?: ElementConstructorTagObject<T>);
    constructor(value: Node, object?: ElementConstructorTagObject<T>);
    get node(): N;
}
