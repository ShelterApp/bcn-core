import { QueryParams } from "../base";
import { Liaison } from "../../models";
declare function list(queryParams?: QueryParams): Promise<ReadonlyArray<Liaison>>;
declare function count(queryParams?: QueryParams): Promise<number>;
declare function create(data: any): Promise<Liaison>;
declare function get(id: string, queryParams?: QueryParams): Promise<Liaison>;
declare function update({ id, ...data }: Liaison): Promise<Liaison>;
declare function del(id: string): Promise<Liaison>;
declare const _default: {
    list: typeof list;
    count: typeof count;
    create: typeof create;
    get: typeof get;
    update: typeof update;
    del: typeof del;
};
export default _default;
export { list, count, create, get, update, del };
