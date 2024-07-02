import { getConfig } from "../config";
import { QueryParams, $get, $post, $put, $delete } from "../base";
import { Service, City, Zip } from "../../models";

import { ListOfServiceIds, AvailableBed, SearchCityOrZip } from "./types";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/services`;
}

async function list(
    queryParams?: QueryParams
): Promise<ReadonlyArray<Service>> {
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

async function create(data: any): Promise<Service> {
    return await $post({
        url: getBaseUrl(),
        body: data,
    });
}

async function get(id: string, queryParams?: QueryParams): Promise<Service> {
    return await $get({
        queryParams,
        url: `${getBaseUrl()}/${id}`,
    });
}

async function update({ id, ...data }: Service): Promise<Service> {
    return await $put({
        url: `${getBaseUrl()}/${id}`,
        body: data,
    });
}

async function del(id: string): Promise<Service> {
    return await $delete({
        url: `${getBaseUrl()}/${id}`,
    });
}

async function likes(id: string): Promise<Service> {
    return await $post({
        url: `${getBaseUrl()}/${id}/likes`,
    });
}

async function approveServices(data: ListOfServiceIds): Promise<void> {
    return await $post({
        url: `${getBaseUrl()}/approve-services`,
        body: data,
    });
}

async function removeServices(data: ListOfServiceIds): Promise<void> {
    return await $post({
        url: `${getBaseUrl()}/remove-services`,
        body: data,
    });
}

async function listBeds(): Promise<ReadonlyArray<Service>> {
    return await $get({
        url: `${getBaseUrl()}/beds`,
    });
}

async function updateAvailableBeds(
    data: ReadonlyArray<AvailableBed>
): Promise<void> {
    return await $post({
        url: `${getBaseUrl()}/update-available-beds`,
        body: data,
    });
}

async function searchCityOrZip(
    data: SearchCityOrZip
): Promise<{
    readonly cities: readonly City[];
    readonly zips: readonly Zip[];
}> {
    return await $post({
        url: `${getBaseUrl()}/search-city-or-zip`,
        body: data,
    });
}

export default {
    list,
    count,
    create,
    get,
    update,
    del,
    likes,
    approveServices,
    removeServices,
    listBeds,
    updateAvailableBeds,
    searchCityOrZip,
};
export {
    list,
    count,
    create,
    get,
    update,
    del,
    likes,
    approveServices,
    removeServices,
    listBeds,
    updateAvailableBeds,
    searchCityOrZip,
};
