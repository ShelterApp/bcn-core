'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.timestampsPlugin = timestampsPlugin;
//# sourceMappingURL=mongoose.js.map
