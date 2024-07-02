interface QueryParams {
    readonly search?: string;
    readonly q?: string;
    readonly filter?: string;
    readonly select?: string;
    readonly populate?: string;
    readonly sort?: string;
    readonly direction?: string;
    readonly skip?: number;
    readonly limit?: number;
    readonly [key: string]: any;
}
interface Request {
    readonly url: string;
    readonly queryParams?: QueryParams;
    readonly body?: Object;
    readonly token?: any;
}
interface Count {
    readonly count: number;
}
declare function $get(data: Request): Promise<any>;
declare function $post(data: Request): Promise<any>;
declare function $put(data: Request): Promise<any>;
declare function $patch(data: Request): Promise<any>;
declare function $delete(data: Request): Promise<any>;
declare const _default: {
    $get: typeof $get;
    $post: typeof $post;
    $put: typeof $put;
    $patch: typeof $patch;
    $delete: typeof $delete;
};
export default _default;
export { QueryParams, Request, Count, $get, $post, $put, $patch, $delete };
