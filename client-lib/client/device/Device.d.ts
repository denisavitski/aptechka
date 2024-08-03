import { TierResult } from 'detect-gpu';

export type DeviceOS = 'macOS' | 'iOS' | 'Windows' | 'Android' | 'Linux' | 'unknown';
declare class Device {
    #private;
    constructor();
    get OS(): string;
    get gpu(): string;
    get gpuTier(): number;
    get gpuDetection(): Promise<TierResult>;
    get isMobile(): boolean;
    get isTouch(): boolean;
    get isWebgl(): boolean;
    get isWebp(): boolean;
    get isApple(): boolean;
    resize: () => void;
}
export declare const device: Device;
export {};
