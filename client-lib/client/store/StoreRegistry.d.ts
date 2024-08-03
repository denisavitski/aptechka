import { Store } from './Store';

export interface StoreRegistryStateStore {
    name: string;
    value: any;
}
export type StoreRegistryState = {
    stores: Array<StoreRegistryStateStore>;
};
declare class StoreRegistry {
    #private;
    constructor();
    get projectName(): string;
    get localStoreRegistryName(): string;
    get loadedState(): StoreRegistryState | null;
    saveState(): void;
    loadState(state?: string | StoreRegistryState | null): void;
    resetState(): void;
    updateStore(store: Store<any, any>): Store<any, any>;
    getState(): StoreRegistryState;
}
export declare const storeRegistry: StoreRegistry;
export {};
