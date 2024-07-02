import { getConfig } from "../config";
import { QueryParams, $get, $post, $put, $delete } from "../base";
import { User } from "../../models";
import { SetPermissionBody } from "./types";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/users`;
}

async function list(queryParams?: QueryParams): Promise<ReadonlyArray<User>> {
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

async function create(data: any): Promise<User> {
    return await $post({
        url: getBaseUrl(),
        body: data,
    });
}

async function get(id: string, queryParams?: QueryParams): Promise<User> {
    return await $get({
        queryParams,
        url: `${getBaseUrl()}/${id}`,
    });
}

async function update({ id, ...data }: User): Promise<User> {
    return await $put({
        url: `${getBaseUrl()}/${id}`,
        body: data,
    });
}

async function del(id: string): Promise<User> {
    return await $delete({
        url: `${getBaseUrl()}/${id}`,
    });
}

async function togglePerm(id: string): Promise<User> {
    return await $post({
        url: `${getBaseUrl()}/${id}/toggle-perm`,
    });
}

async function togglePermSupperUser(id: string): Promise<User> {
    return await $post({
        url: `${getBaseUrl()}/${id}/toggle-perm-supper-user`,
    });
}

async function setPermission(
    id: string,
    data: SetPermissionBody
): Promise<User> {
    return await $post({
        url: `${getBaseUrl()}/${id}/set-permission`,
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
    togglePerm,
    togglePermSupperUser,
    setPermission,
};
export {
    list,
    count,
    create,
    get,
    update,
    del,
    togglePerm,
    togglePermSupperUser,
    setPermission,
};
