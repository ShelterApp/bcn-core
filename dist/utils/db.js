'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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

/**
 * Replace native mongoose's `timestamps` with additional `deletedAt` field
 * @param schema Mongoose Schema
 * @param _ Options
 */
const timestampsPlugin = (schema, _) => {
    // custom fields
    schema.add({
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    });
    // remove private fields on toJSON
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: (_, ret) => (Object.assign(Object.assign({}, ret), { _id: undefined, deletedAt: undefined })),
    });
    // attach conditions on find hooks
    const hooks = {
        query() {
            this.where({
                deletedAt: { $exists: false },
            });
        },
    };
    [
        'count',
        'countDocuments',
        'find',
        'findOne',
        'findOneAndRemove',
        'findOneAndUpdate',
        'update',
        'updateOne',
        'updateMany',
    ].forEach(method => schema.pre(method, hooks.query));
    // custom methods with fields injected on create, update & delete
    // tslint:disable-next-line: no-object-mutation
    Object.assign(schema.methods, {
        $create() {
            this.set({
                createdAt: Date.now(),
            });
            return this.save();
        },
        $update(changes) {
            this.set(Object.assign(Object.assign({}, changes), { updatedAt: Date.now() }));
            return this.save();
        },
        $delete() {
            this.set({
                deletedAt: Date.now(),
            });
            return this.save();
        },
    });
};

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST || 'localhost';
const port = +(process.env.MONGO_PORT || 0) || 27017;
const dbName = process.env.MONGO_DB_NAME || 'things';
const uri = user && password
    ? `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`
    : `mongodb://${host}:${port}/${dbName}`;
const connect = ({ mongoose, options = {}, cb = () => { } }) => {
    const { timestampsPlugin: timestampsPluginFlag } = options, connectionOptions = __rest(options, ["timestampsPlugin"]);
    if (timestampsPluginFlag) {
        mongoose.plugin(timestampsPlugin);
    }
    mongoose.connection.on('connected', () => {
        logger.info('> MongoDB connected');
    });
    mongoose.connection.on('error', (err) => {
        mongoose.disconnect();
        logger.info('> MongoDB failed to start');
        errorHandler.handle(err);
    });
    mongoose.connect(uri, Object.assign({ useNewUrlParser: true, promiseLibrary: Promise }, connectionOptions)).then(cb);
};
var db = { connect };

module.exports = db;
//# sourceMappingURL=db.js.map
