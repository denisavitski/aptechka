import { ElementConstructor } from '../element-constructor';

export declare function h(tag: string | JSX.Component, attributes?: null | {
    [key: string]: any;
}, ...children: JSX.ComponentChildren): Node | (() => any) | ElementConstructor<DocumentFragment, Node> | null;
export declare function Fragment(children: any): ElementConstructor<DocumentFragment, Node>;
