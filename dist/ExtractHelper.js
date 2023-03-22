"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractHelper = void 0;
const url = require("url");
class ExtractHelper {
    constructor() {
        this.REGEXP = {
            NUMBER: /^\-?\d+$/,
            UUID: /^[\da-f]{8}\-[\da-f]{4}\-[\da-f]{4}\-[\da-f]{4}\-[\da-f]{12}$/,
        };
    }
    method(request, response) {
        return request.method;
    }
    route(request, response, { detectDynamicPath = false } = {}) {
        if (request.route) {
            return request.route.path;
        }
        return url.parse(request.originalUrl).pathname;
    }
    routeWithMark(request, response) {
        const { pathname } = url.parse(request.originalUrl);
        return pathname
            .split('/')
            .map((path) => {
            if (this.REGEXP.NUMBER.test(path) || this.REGEXP.UUID.test(path)) {
                return ':id';
            }
            return path;
        })
            .join('/');
    }
    statusCode(_request, response) {
        return response.statusCode.toString();
    }
}
exports.ExtractHelper = ExtractHelper;
