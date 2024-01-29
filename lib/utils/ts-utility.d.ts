export type NestedKeys<T> = T extends Node ? '' : T extends object ? {
    [K in keyof T]: T[K] extends infer U ? `${Extract<K, string>}${NestedKeys<U> extends '' ? '' : '.'}${NestedKeys<U>}` : never;
}[keyof T] : '';
export type NestedValueOf<Obj, Key extends string> = Obj extends object ? Key extends `${infer Parent}.${infer Leaf}` ? Parent extends keyof Obj ? NestedValueOf<Obj[Parent], Leaf> : never : Key extends keyof Obj ? Obj[Key] : never : never;
type Tail<T extends any[]> = ((...t: T) => void) extends (h: any, ...r: infer R) => void ? R : never;
export type DeepOmit<T, Path extends string[]> = T extends object ? Path['length'] extends 1 ? Omit<T, Path[0]> : {
    [K in keyof T]: K extends Path[0] ? DeepOmit<T[K], Tail<Path>> : T[K];
} : T;
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export type Requiredish<T> = {
    [K in keyof Required<T>]: T[K];
};
export type WithRequired<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
export type Split<S extends string, D extends string> = string extends S ? string[] : S extends '' ? [] : S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];
export {};
