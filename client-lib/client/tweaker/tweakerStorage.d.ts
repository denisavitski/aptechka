export type TweakerOpenedPanels = Array<string>;
export type TweakerChangedSizes = {
    [key: string]: number;
};
export interface TweakerStorageState {
    openedPanels: TweakerOpenedPanels;
    changedSizes: TweakerChangedSizes;
    scrollValue: number;
}
declare class TweakerStorage {
    #private;
    scrollValue: number;
    constructor();
    openPanel(key: string): void;
    closePanel(key: string): void;
    isPanelOpened(key: string): boolean;
    changedSizes(key: string): number;
    changeSize(key: string, value?: number | undefined | null): void;
    save(): void;
    load(): void;
}
export declare const tweakerStorage: TweakerStorage;
export {};
