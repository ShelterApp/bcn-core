import { getConfig } from "../config";
import { QueryParams, $get, $post, $put, $delete } from "../base";
import { StaticPage } from "../../models";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/static-pages`;
}

async function list(
    queryParams?: QueryParams
): Promise<ReadonlyArray<StaticPage>> {
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

async function create(data: any): Promise<StaticPage> {
    return await $post({
        url: `${getBaseUrl()}`,
        body: data,
    });
}

async function get(
    code: string,
    queryParams?: QueryParams
): Promise<StaticPage> {
    return await $get({
        queryParams,
        url: `${getBaseUrl()}/${code}`,
    });
}

async function update(code: string): Promise<StaticPage> {
    return await $put({
        url: `${getBaseUrl()}/${code}`,
    });
}

async function del(code: string): Promise<StaticPage> {
    return await $delete({
        url: `${getBaseUrl()}/${code}`,
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
