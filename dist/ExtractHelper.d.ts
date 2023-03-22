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
export declare class ExtractHelper {
    REGEXP: {
        NUMBER: RegExp;
        UUID: RegExp;
    };
    method(request: IRquest, response?: any): string;
    route(request: IRquest, response?: any, { detectDynamicPath }?: {
        detectDynamicPath?: boolean;
    }): string;
    routeWithMark(request: IRquest, response?: any): string;
    statusCode(_request: any, response: IResponse): string;
}
export {};
