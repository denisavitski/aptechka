export declare abstract class Measurer {
    #private;
    constructor(element: HTMLElement);
    get element(): HTMLElement;
    value: (modifier?: ((current: number) => number) | undefined) => number;
    destroy(): void;
    protected abstract handleResize(): number;
}
