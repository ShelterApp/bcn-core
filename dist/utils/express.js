'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var httpStatusCodes = require('http-status-codes');
var mongoose = require('mongoose');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

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

const log = (...args) => console.log(`LOG:${Date.now()}`, ...args);
const info = (...args) => console.info(`INF:${Date.now()}`, ...args);
const error = (...args) => console.error(`ERR:${Date.now()}`, ...args);
var logger = { log, info, error };

/**
 * Log error to destination then exit the process if programmer error
 * @param err error to be handled
 */
const handle = (err) => {
    // TODO
    // E.g. log to sentry
    // E.g. log to console
    logger.error(err);
    if (!err.operational) {
        logger.info('> App exited!');
        process.exit(1);
    }
};
var errorHandler = { handle };

/* tslint:disable */
const DEFAULT_QUERY = {
    select: [],
    populate: [],
};
const DEFAULT_LIST_QUERY = {
    query: {},
    select: [],
    populate: [],
    sort: 'createdAt',
    skip: 0,
    limit: 25,
};
const parseSearchQuery = (searchBy, keyword) => {
    if (!searchBy.trim() || !keyword.trim()) {
        return {};
    }
    const query = searchBy
        .trim()
        .split(',')
        .reduce((prev, key) => !key.trim()
        ? prev
        : prev.concat({
            [key.trim()]: new RegExp(keyword.trim(), 'gi'),
        }), []);
    if (query.length === 0) {
        return {};
    }
    return query.length === 1 ? query[0] : { $or: query };
};
const parseFilterQuery = (filterBy, values) => {
    if (!filterBy.trim()) {
        return {};
    }
    return filterBy
        .trim()
        .split(',')
        .reduce((prev, key) => {
        if (!key || !key.trim()) {
            return prev;
        }
        if (!values[key.trim()].trim()) {
            return Object.assign(Object.assign({}, prev), { $or: [...(prev['$or'] || []), { [key.trim()]: { $exists: false } }, { [key.trim()]: null }] });
        }
        const valuesArray = values[key.trim()].trim().split(',');
        let singleValue = valuesArray[0];
        if (mongoose.isValidObjectId(singleValue)) {
            singleValue = mongoose.Types.ObjectId(singleValue);
        }
        return Object.assign(Object.assign({}, prev), { [key.trim()]: valuesArray.length === 1 ? singleValue : { $in: valuesArray.map(v => v.trim()) } });
    }, {});
};
const parseSelect = (select) => {
    return select.split(',').filter(item => !!item);
};
const parsePopulate = (populate) => {
    return populate.split(',').filter(item => !!item);
};
const parseSort = (sort, direction) => {
    return direction === 'desc' ? `-${sort.trim()}` : sort.trim();
};
const parseQuery = ({ select = '', populate = '' }) => ({
    select: parseSelect(select),
    populate: parsePopulate(populate),
});
const parseListQuery = (_a) => {
    var { search = '', q = '', filter = '', select = '', populate = '', sort = 'createdAt', direction = 'asc', skip = 0, limit = 25 } = _a, filterValues = __rest(_a, ["search", "q", "filter", "select", "populate", "sort", "direction", "skip", "limit"]);
    const _b = parseSearchQuery(search, q), { $or: searchOr } = _b, searchQuery = __rest(_b, ["$or"]);
    const _c = parseFilterQuery(filter, filterValues), { $or: filterOr } = _c, filterQuery = __rest(_c, ["$or"]);
    const $and = []; // tslint:disable-line: readonly-array
    if (searchOr) {
        $and.push({ $or: searchOr });
    }
    if (filterOr) {
        $and.push({ $or: filterOr });
    }
    return {
        query: Object.assign(Object.assign(Object.assign({}, searchQuery), filterQuery), ($and.length > 0 ? { $and } : {})),
        select: parseSelect(select),
        populate: parsePopulate(populate),
        sort: parseSort(sort, direction),
        skip: +skip,
        limit: +limit,
    };
};
// ---------------------------------------------------
// -----------------Express Middleware----------------
// ---------------------------------------------------
/**
 * Parse request's query to the mongoose compatible query
 * @param req Express Request object
 * @param _ Express Response object
 * @param next Express Next function
 */
const parseQueryMiddleware = (req, _, next) => {
    try {
        const myQuery = parseQuery(req.query);
        Object.assign(req, { myQuery }); // tslint:disable-line: no-object-mutation
        next();
    }
    catch (err) {
        next(new HttpError(httpStatusCodes.BAD_REQUEST, err));
    }
};
/**
 * Parse request's query to the mongoose compatible query
 * @param req Express Request object
 * @param _ Express Response object
 * @param next Express Next function
 */
const parseListQueryMiddleware = (req, _, next) => {
    try {
        const myQuery = parseListQuery(req.query);
        Object.assign(req, { myQuery }); // tslint:disable-line: no-object-mutation
        next();
    }
    catch (err) {
        next(new HttpError(httpStatusCodes.BAD_REQUEST, err));
    }
};
/**
 * An Express RequestHandler wrapper that throws error if invalid,
 * otherwise parses the request's body to the desired one
 * @param validate Validation function
 */
const validateBody = (validate) => {
    return (req, _, next) => {
        try {
            const myBody = validate(req.body);
            Object.assign(req, { myBody }); // tslint:disable-line: no-object-mutation
            next();
        }
        catch (err) {
            next(new HttpError(httpStatusCodes.BAD_REQUEST, err));
        }
    };
};
/**
 * An Express RequestHandler that handles the 404 Not Found error
 * @param _ Express Request object
 * @param __ Express Response object
 * @param next Express Next function
 */
const handleNotFound = (_, __, next) => {
    next(new HttpError(httpStatusCodes.NOT_FOUND, 'Resource not found'));
};
/**
 * An Express RequestHandler that responses error info to the client
 * @param err Http Error object
 * @param _ Express Request object
 * @param res Express Response object
 * @param __ Express Next function
 */
const handleErrors = (err, _, res, __) => {
    errorHandler.handle(err);
    res.status(err.code).send(err);
};

exports.DEFAULT_LIST_QUERY = DEFAULT_LIST_QUERY;
exports.DEFAULT_QUERY = DEFAULT_QUERY;
exports.handleErrors = handleErrors;
exports.handleNotFound = handleNotFound;
exports.parseListQuery = parseListQuery;
exports.parseListQueryMiddleware = parseListQueryMiddleware;
exports.parseQuery = parseQuery;
exports.parseQueryMiddleware = parseQueryMiddleware;
exports.validateBody = validateBody;
//# sourceMappingURL=express.js.map
