'use strict';

const log = (...args) => console.log(`LOG:${Date.now()}`, ...args);
const info = (...args) => console.info(`INF:${Date.now()}`, ...args);
const error = (...args) => console.error(`ERR:${Date.now()}`, ...args);
var logger = { log, info, error };

module.exports = logger;
//# sourceMappingURL=logger.js.map
