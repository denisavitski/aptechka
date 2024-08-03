export interface ComponentElementParameters {
    tag: Function;
    attributes: null | {
        [key: string]: any;
    };
}
export type ComponentCreateCallback<T = void> = (e: ComponentElement) => T;
export type ComponentConnectCallback = (e: ComponentElement) => void | (() => void);
export type ComponentDisconnectCallback = (e: ComponentElement) => void;
export declare class ComponentElement extends HTMLElement {
    #private;
    constructor(parameters?: ComponentElementParameters);
    addConnectCallback(callback: ComponentConnectCallback): void;
    addDisconnectCallback(callback: ComponentConnectCallback): void;
    createContext(name: string, value: any): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
