import { getConfig } from "../config";
import { QueryParams, $get, $post, $put, $delete } from "../base";
import { Liaison } from "../../models";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/liaisons`;
}

async function list(
    queryParams?: QueryParams
): Promise<ReadonlyArray<Liaison>> {
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

async function create(data: any): Promise<Liaison> {
    return await $post({
        url: `${getBaseUrl()}`,
        body: data,
    });
}

async function get(id: string, queryParams?: QueryParams): Promise<Liaison> {
    return await $get({
        queryParams,
        url: `${getBaseUrl()}/${id}`,
    });
}

async function update({ id, ...data }: Liaison): Promise<Liaison> {
    return await $put({
        url: `${getBaseUrl()}/${id}`,
        body: data,
    });
}

async function del(id: string): Promise<Liaison> {
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
