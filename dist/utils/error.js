'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Check if the current environment is development
 * @returns boolean
 */
const isDev = () => {
    return ['test', 'staging', 'production'].indexOf(process.env.NODE_ENV) === -1;
};

class MyError extends Error {
    constructor(err, operational = false) {
        super();
        this.name = err instanceof Error ? err.name : 'Error';
        this.message = err instanceof Error ? err.message : err;
        this.operational = operational;
    }
}
/**
 * HttpError that takes the first parameter as an Http Status Code
 */
class HttpError extends MyError {
    constructor(code, err) {
        super(err, true);
        this.code = code;
        this.name = 'HttpError';
    }
    toJSON() {
        const content = {
            code: this.code,
            message: this.message,
        };
        return !isDev() ? content : Object.assign(Object.assign({}, content), { error: this.stack });
    }
}

exports.HttpError = HttpError;
exports.MyError = MyError;
//# sourceMappingURL=error.js.map
