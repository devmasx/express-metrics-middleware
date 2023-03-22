import { Request, Response, NextFunction } from 'express';
import { ExtractHelper } from './ExtractHelper';
export interface IMetricsData {
    timeInMs: number;
    method: string;
    route: string;
    status: string;
    requestContentLength: number;
    responseContentLength: number;
}
export interface ICollector {
    onRequestFinish(metricsData: IMetricsData, request?: Request, response?: Response): any;
}
export declare const metricsMiddleware: (collector: ICollector, { detectDynamicPath }?: {
    detectDynamicPath?: boolean;
}, extractHelper?: ExtractHelper) => (request: Request, response: Response, next: NextFunction) => void;
