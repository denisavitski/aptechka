export type NestedKeys<T> = T extends Node ? '' : T extends object ? {
    [K in keyof T]: T[K] extends infer U ? `${Extract<K, string>}${NestedKeys<U> extends '' ? '' : '.'}${NestedKeys<U>}` : never;
}[keyof T] : '';
export type NestedValueOf<Obj, Key extends string> = Obj extends object ? Key extends `${infer Parent}.${infer Leaf}` ? Parent extends keyof Obj ? NestedValueOf<Obj[Parent], Leaf> : never : Key extends keyof Obj ? Obj[Key] : never : never;
export type Tail<T extends any[]> = ((...t: T) => void) extends (h: any, ...r: infer R) => void ? R : never;
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
export type SplitFirst<S extends string, D extends string> = string extends S ? string[] : S extends '' ? [] : S extends `${infer T}${D}${infer U}` ? [T, U] : [S];
export type KebabToCamel<S extends string> = S extends `${infer T}-${infer U}` ? `${T}${Capitalize<KebabToCamel<U>>}` : S;
export type CamelToKebab<S extends string> = S extends `${infer T}${infer U}` ? U extends Uncapitalize<U> ? `${Uncapitalize<T>}${CamelToKebab<U>}` : `${Uncapitalize<T>}-${CamelToKebab<U>}` : '';
export type UndefIndex<T extends any[], I extends number> = {
    [P in keyof T]: P extends Exclude<keyof T, keyof any[]> ? P extends `${I}` ? undefined : T[P] : T[P];
};
export type FilterUndefined<T extends any[]> = T extends [] ? [] : T extends [infer H, ...infer R] ? H extends undefined ? FilterUndefined<R> : [H, ...FilterUndefined<R>] : T;
export type SpliceTuple<T extends any[], I extends number> = FilterUndefined<UndefIndex<T, I>>;
