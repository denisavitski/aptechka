export declare function getRootVariables<T extends string, V extends {
    [key in T]: string;
} = {
    [key in T]: string;
}>(...names: T[]): V;
