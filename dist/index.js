"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const ExtractHelper_1 = require("./ExtractHelper");
function getTimeFrom(startAt) {
    const diff = process.hrtime(startAt);
    return diff[0] * 1e3 + diff[1] * 1e-6;
}
const metricsMiddleware = (collector, { detectDynamicPath = false } = {}, extractHelper = new ExtractHelper_1.ExtractHelper()) => (request, response, next) => {
    const startAt = process.hrtime();
    next();
    response.on('finish', () => {
        const timeInMs = getTimeFrom(startAt);
        const method = extractHelper.method(request, response);
        const route = extractHelper.route(request, response, {
            detectDynamicPath,
        });
        const status = extractHelper.statusCode(request, response);
        let requestContentLength = parseInt(request.headers['content-length'] || '0');
        let responseContentLength = parseInt(response.get('Content-Length') || '0');
        const metricsData = {
            timeInMs,
            method,
            route,
            status,
            requestContentLength,
            responseContentLength,
        };
        collector.onRequestFinish(metricsData, request, response);
    });
};
exports.metricsMiddleware = metricsMiddleware;
