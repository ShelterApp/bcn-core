import { getConfig } from "../config";
import { QueryParams, $get, $post, $put, $delete } from "../base";
import { Region } from "../../models";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/regions`;
}

async function list(queryParams?: QueryParams): Promise<ReadonlyArray<Region>> {
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

async function create(data: any): Promise<Region> {
    return await $post({
        url: `${getBaseUrl()}`,
        body: data,
    });
}

async function get(id: string, queryParams?: QueryParams): Promise<Region> {
    return await $get({
        queryParams,
        url: `${getBaseUrl()}/${id}`,
    });
}

async function update({ id, ...data }: Region): Promise<Region> {
    return await $put({
        url: `${getBaseUrl()}/${id}`,
        body: data,
    });
}

async function del(id: string): Promise<Region> {
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
