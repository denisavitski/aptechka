export interface InstantiateOptions {
    children?: JSX.ComponentChildren;
    attributes?: JSX.AllAttributes;
}
export declare function instantiate(Component: JSX.Component, options?: InstantiateOptions): any;
