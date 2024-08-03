import { ComponentElement } from './ComponentElement';

export declare const currentComponentElement: {
    value: ComponentElement;
};
export declare const nextComponentAttributes: {
    value: {
        [key: string]: any;
    } | null;
};
export declare const contextStack: {
    value: Array<Map<string, any>>;
};
