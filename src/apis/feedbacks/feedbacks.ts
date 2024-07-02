import { getConfig } from "../config";
import { QueryParams, $get, $post, $delete } from "../base";
import { Feedback } from "../../models";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/feedbacks`;
}

async function list(
    queryParams?: QueryParams
): Promise<ReadonlyArray<Feedback>> {
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

async function createServiceFeedBack(data: any): Promise<Feedback> {
    return await $post({
        url: `${getBaseUrl()}/service`,
        body: data,
    });
}

async function createAppFeedback(data: any): Promise<Feedback> {
    return await $post({
        url: `${getBaseUrl()}/app`,
        body: data,
    });
}

async function get(id: string, queryParams?: QueryParams): Promise<Feedback> {
    return await $get({
        queryParams,
        url: `${getBaseUrl()}/${id}`,
    });
}

async function archive(id: string): Promise<Feedback> {
    return await $post({
        url: `${getBaseUrl()}/${id}/archive`,
    });
}

async function del(id: string): Promise<Feedback> {
    return await $delete({
        url: `${getBaseUrl()}/${id}`,
    });
}

export default {
    list,
    count,
    createServiceFeedBack,
    createAppFeedback,
    get,
    archive,
    del,
};
export {
    list,
    count,
    createServiceFeedBack,
    createAppFeedback,
    get,
    archive,
    del,
};
