export interface StudioStorageState {
    openedPanels: Array<string>;
}
declare class StudioStorage {
    #private;
    constructor();
    openPanel(key: string): void;
    closePanel(key: string): void;
    isPanelOpened(key: string): boolean;
    save(): void;
    load(): void;
}
export declare const studioStorage: StudioStorage;
export {};
