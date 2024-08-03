import { StoreManagers } from '../../store';

export type OptionsCatalog = {
    [key: string]: StoreManagers[keyof StoreManagers];
};
export interface En3ParametersManagerOptions {
    optionsCatalog?: OptionsCatalog;
    folderName?: string;
    skipKeys?: Array<string>;
    afterChange?: () => void;
}
export declare class En3ParametersManager {
    #private;
    constructor(subject: any, options?: En3ParametersManagerOptions);
    destroy(): void;
}
