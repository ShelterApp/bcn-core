import { QueryParams } from "../base";
import { Region } from "../../models";
declare function list(queryParams?: QueryParams): Promise<ReadonlyArray<Region>>;
declare function count(queryParams?: QueryParams): Promise<number>;
declare function create(data: any): Promise<Region>;
declare function get(id: string, queryParams?: QueryParams): Promise<Region>;
declare function update({ id, ...data }: Region): Promise<Region>;
declare function del(id: string): Promise<Region>;
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
