import { Config as ApiConfig, setConfig } from './config';
import { QueryParams, Request } from './base';

function initApi(cfg?: ApiConfig) {
  setConfig(cfg);
}

export {
  ApiConfig, initApi,
  QueryParams, Request,
};

export * from './auth';
export * from './users';
export * from './services';
export * from './crisis-lines';
export * from './feedbacks';
export * from './files';
export * from './bot';
export * from './static-pages';
export * from './liaisons';
export * from './regions';
export * from './units';
export * from './common';
