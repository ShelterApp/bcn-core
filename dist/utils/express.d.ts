import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HttpError } from './error';
interface OriginalQuery {
    readonly select?: string;
    readonly populate?: string;
}
interface Query {
    readonly select: string[];
    readonly populate: string[];
}
interface OriginalListQuery {
    readonly sort?: string;
    readonly direction?: string;
    readonly skip?: number;
    readonly limit?: number;
    readonly select?: string;
    readonly populate?: string;
    readonly search?: string;
    readonly q?: string;
    readonly filter?: string;
    readonly [key: string]: any;
}
interface ListQuery {
    readonly query: {
        readonly [key: string]: string | string[] | any;
    };
    readonly select: string[];
    readonly populate: string[];
    readonly sort: string;
    readonly skip: number;
    readonly limit: number;
}
declare const DEFAULT_QUERY: Query;
declare const DEFAULT_LIST_QUERY: ListQuery;
declare const parseQuery: ({ select, populate }: OriginalQuery) => Query;
declare const parseListQuery: ({ search, q, filter, select, populate, sort, direction, skip, limit, ...filterValues }: OriginalListQuery) => ListQuery;
/**
 * Parse request's query to the mongoose compatible query
 * @param req Express Request object
 * @param _ Express Response object
 * @param next Express Next function
 */
declare const parseQueryMiddleware: (req: Request, _: Response, next: NextFunction) => void;
/**
 * Parse request's query to the mongoose compatible query
 * @param req Express Request object
 * @param _ Express Response object
 * @param next Express Next function
 */
declare const parseListQueryMiddleware: (req: Request, _: Response, next: NextFunction) => void;
/**
 * An Express RequestHandler wrapper that throws error if invalid,
 * otherwise parses the request's body to the desired one
 * @param validate Validation function
 */
declare const validateBody: (validate: Function) => RequestHandler;
/**
 * An Express RequestHandler that handles the 404 Not Found error
 * @param _ Express Request object
 * @param __ Express Response object
 * @param next Express Next function
 */
declare const handleNotFound: (_: Request, __: Response, next: NextFunction) => void;
/**
 * An Express RequestHandler that responses error info to the client
 * @param err Http Error object
 * @param _ Express Request object
 * @param res Express Response object
 * @param __ Express Next function
 */
declare const handleErrors: (err: HttpError, _: Request, res: Response, __: NextFunction) => void;
export { OriginalQuery, Query, OriginalListQuery, ListQuery, DEFAULT_QUERY, DEFAULT_LIST_QUERY, parseQuery, parseListQuery, parseQueryMiddleware, parseListQueryMiddleware, validateBody, handleNotFound, handleErrors, };
