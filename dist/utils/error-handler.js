'use strict';

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

module.exports = errorHandler;
//# sourceMappingURL=error-handler.js.map
