import { getConfig } from "../config";
import { QueryParams, $get, $post, $put, $delete } from "../base";
import { CrisisLine } from "../../models";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/crisis-lines`;
}

async function list(
    queryParams?: QueryParams
): Promise<ReadonlyArray<CrisisLine>> {
    return await $get({
        queryParams,
        url: getBaseUrl(),
    });
}

async function count(queryParams?: QueryParams): Promise<number> {
    const { count } = await $get({
        queryParams,
        url: `${getBaseUrl()}/count`,
    });

    return count;
}

async function create(data: any): Promise<CrisisLine> {
    return await $post({
        url: getBaseUrl(),
        body: data,
    });
}

async function get(id: string, queryParams?: QueryParams): Promise<CrisisLine> {
    return await $get({
        queryParams,
        url: `${getBaseUrl()}/${id}`,
    });
}

async function update({ id, ...data }: CrisisLine): Promise<CrisisLine> {
    return await $put({
        url: `${getBaseUrl()}/${id}`,
        body: data,
    });
}

async function del(id: string): Promise<CrisisLine> {
    return await $delete({
        url: `${getBaseUrl()}/${id}`,
    });
}

export default {
    list,
    count,
    create,
    get,
    update,
    del,
};
export { list, count, create, get, update, del };
