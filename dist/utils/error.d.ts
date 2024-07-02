declare class MyError extends Error {
    readonly operational?: boolean;
    constructor(err: Error | string, operational?: boolean);
}
/**
 * HttpError that takes the first parameter as an Http Status Code
 */
declare class HttpError extends MyError {
    readonly code: number;
    constructor(code: number, err: Error | string);
    toJSON(): {
        code: number;
        message: string;
    } | {
        error: string | undefined;
        code: number;
        message: string;
    };
}
export { MyError, HttpError };
