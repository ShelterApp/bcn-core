import { Mongoose, ConnectionOptions } from 'mongoose';
interface MongooseOptions extends ConnectionOptions {
    readonly timestampsPlugin?: boolean;
}
interface MongooseConnect {
    readonly mongoose: Mongoose;
    readonly options?: MongooseOptions;
    readonly cb?: () => void;
}
declare const _default: {
    connect: ({ mongoose, options, cb }: MongooseConnect) => void;
};
export default _default;
