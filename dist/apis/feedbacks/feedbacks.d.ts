import { QueryParams } from "../base";
import { Feedback } from "../../models";
declare function list(queryParams?: QueryParams): Promise<ReadonlyArray<Feedback>>;
declare function count(queryParams?: QueryParams): Promise<number>;
declare function createServiceFeedBack(data: any): Promise<Feedback>;
declare function createAppFeedback(data: any): Promise<Feedback>;
declare function get(id: string, queryParams?: QueryParams): Promise<Feedback>;
declare function archive(id: string): Promise<Feedback>;
declare function del(id: string): Promise<Feedback>;
declare const _default: {
    list: typeof list;
    count: typeof count;
    createServiceFeedBack: typeof createServiceFeedBack;
    createAppFeedback: typeof createAppFeedback;
    get: typeof get;
    archive: typeof archive;
    del: typeof del;
};
export default _default;
export { list, count, createServiceFeedBack, createAppFeedback, get, archive, del, };
