import { InstantiateOptions } from './instantiate';

export interface RenderOptions extends InstantiateOptions {
    containerElement?: HTMLElement;
}
export declare function render(Component: JSX.Component, options?: RenderOptions): void;
