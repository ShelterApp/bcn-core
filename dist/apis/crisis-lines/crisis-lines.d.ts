import { QueryParams } from "../base";
import { CrisisLine } from "../../models";
declare function list(queryParams?: QueryParams): Promise<ReadonlyArray<CrisisLine>>;
declare function count(queryParams?: QueryParams): Promise<number>;
declare function create(data: any): Promise<CrisisLine>;
declare function get(id: string, queryParams?: QueryParams): Promise<CrisisLine>;
declare function update({ id, ...data }: CrisisLine): Promise<CrisisLine>;
declare function del(id: string): Promise<CrisisLine>;
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
