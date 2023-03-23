import { Request, Response, NextFunction } from 'express';
import { ExtractHelper } from './ExtractHelper';

export interface IMetricsData {
  method: string;
  path: string;
  status: string;
  expressRoute: string;
  timeInMs: number;
  requestContentLength: number;
  responseContentLength: number;
}

export interface ICollector {
  onRequestFinish(metricsData: IMetricsData, request?: Request, response?: Response);
}

function getTimeFrom(startAt) {
  const diff = process.hrtime(startAt);
  return diff[0] * 1e3 + diff[1] * 1e-6;
}

export const metricsMiddleware =
  (collector: ICollector, { detectDynamicPath = false } = {}, extractHelper: ExtractHelper = new ExtractHelper()) =>
  (request: Request, response: Response, next: NextFunction) => {
    const startAt = process.hrtime();
    next();
    response.on('finish', () => {
      const timeInMs = getTimeFrom(startAt);
      const method = extractHelper.method(request, response);
      const path = extractHelper.path(request, response);
      const expressRoute = extractHelper.expressRoute(request, response, { detectDynamicPath });
      const status = extractHelper.statusCode(request, response);

      let requestContentLength = parseInt(request.headers['content-length'] || '0');
      let responseContentLength = parseInt(response.get('Content-Length') || '0');
      const metricsData = {
        method,
        path,
        status,
        timeInMs,
        expressRoute,
        requestContentLength,
        responseContentLength,
      };

      collector.onRequestFinish(metricsData, request, response);
    });
  };
