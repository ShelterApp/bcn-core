import { QueryParams } from "../base";
import { StaticPage } from "../../models";
declare function list(queryParams?: QueryParams): Promise<ReadonlyArray<StaticPage>>;
declare function count(queryParams?: QueryParams): Promise<number>;
declare function create(data: any): Promise<StaticPage>;
declare function get(code: string, queryParams?: QueryParams): Promise<StaticPage>;
declare function update(code: string): Promise<StaticPage>;
declare function del(code: string): Promise<StaticPage>;
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
