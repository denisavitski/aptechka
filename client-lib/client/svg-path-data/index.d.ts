import { Dot2D } from '../utils';

export interface GenerateSVGPathDataOptions {
    normalize?: boolean;
    pathSelector?: string;
}
export type BezierPoint = {
    type: string;
    values: Array<number>;
};
export declare function getPathData(svgRaw: string, { pathSelector }?: GenerateSVGPathDataOptions): BezierPoint[];
export interface GeneratePointsOptions extends GenerateSVGPathDataOptions {
    segments?: number;
}
export declare function getPoints(svgRaw: string, options?: GeneratePointsOptions): Dot2D[];
