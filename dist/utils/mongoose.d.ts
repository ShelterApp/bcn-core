import { Schema, Model, Document } from 'mongoose';
interface MongooseFields {
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date;
}
interface MongooseMethods {
    readonly $create: Function;
    readonly $update: Function;
    readonly $delete: Function;
}
/**
 * Custom Document types with additional fields and methods
 */
interface CustomMongooseDocument extends Document, MongooseFields, MongooseMethods {
}
/**
 * Custom Model types with custom MongooseDocument
 */
interface CustomMongooseModel extends Model<CustomMongooseDocument> {
}
/**
 * Replace native mongoose's `timestamps` with additional `deletedAt` field
 * @param schema Mongoose Schema
 * @param _ Options
 */
declare const timestampsPlugin: (schema: Schema, _: any) => void;
export { CustomMongooseDocument, CustomMongooseModel, timestampsPlugin, };
