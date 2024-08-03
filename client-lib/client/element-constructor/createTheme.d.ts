import { CamelToKebab } from '../utils';

export interface CreateThemeOptions<P extends string = ''> {
    prefix?: P;
}
export declare function createTheme<T extends {
    [key: string]: string;
}, P extends string = ''>(object: T, options?: CreateThemeOptions<P>): { [K in Extract<keyof T, string>]: {
    var: `var(--${P}${CamelToKebab<K>})`;
    value: T[K];
}; } & {
    style: { [K_1 in `--${P}${CamelToKebab<Extract<keyof T, string>>}`]: string; };
};
