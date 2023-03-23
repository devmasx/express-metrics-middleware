import * as url from 'url';

interface IRquest {
  originalUrl?: string;
  method?: string;
  route?: {
    path: string;
  };
}
interface IResponse {
  statusCode: number;
}
export class ExtractHelper {
  REGEXP = {
    NUMBER: /^\-?\d+$/,
    UUID: /^[\da-f]{8}\-[\da-f]{4}\-[\da-f]{4}\-[\da-f]{4}\-[\da-f]{12}$/,
  };

  method(request: IRquest, response?) {
    return request.method;
  }

  expressRoute(request: IRquest, response?, { detectDynamicPath = false } = {}): string {
    if (detectDynamicPath) {
      this.routeWithMark(request, response);
    }
    if (request.route) {
      return request.route.path;
    }
    return url.parse(request.originalUrl).pathname;
  }

  path(request: IRquest, response?): string {
    return url.parse(request.originalUrl).pathname;
  }

  routeWithMark(request: IRquest, response?): string {
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

  statusCode(_request, response: IResponse) {
    return response.statusCode.toString();
  }
}
