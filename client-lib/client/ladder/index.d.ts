import { Store } from '../store';

export type LadderDefaultStepName = number | string;
export type LadderOperation = '+' | '*' | '/' | '-';
export type LadderStep<T> = [LadderOperation, T];
export type LadderSteps<K, T> = Map<K, LadderStep<T>>;
export type LadderDefaultValueType = {
    [key: string]: number;
};
export declare class Ladder<V extends LadderDefaultValueType = LadderDefaultValueType, K extends LadderDefaultStepName = LadderDefaultStepName> extends Store<V> {
    #private;
    constructor(base: V);
    get base(): V;
    get steps(): LadderSteps<K, V>;
    close(): void;
    bind(sub: V): void;
    unbind(sub: V): void;
    deleteStep(stepName: K): void;
    getStepValue(stepName: K): V;
    getExcludedStepsValue(...stepNames: Array<K>): V;
    getIncludedStepsValue(...stepNames: Array<K>): V;
    setStep(stepName: K, action: LadderOperation, value: Partial<V>): void;
    calculate(): void;
}
