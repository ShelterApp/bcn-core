'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Check if the current environment is development
 * @returns boolean
 */
const isDev = () => {
    return ['test', 'staging', 'production'].indexOf(process.env.NODE_ENV) === -1;
};
const isTest = () => {
    return process.env.NODE_ENV === 'test';
};
const isStaging = () => {
    return process.env.NODE_ENV === 'staging';
};
const isProduction = () => {
    return process.env.NODE_ENV === 'production';
};

exports.isDev = isDev;
exports.isProduction = isProduction;
exports.isStaging = isStaging;
exports.isTest = isTest;
//# sourceMappingURL=index.js.map
