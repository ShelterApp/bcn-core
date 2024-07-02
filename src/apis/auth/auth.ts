import { getConfig } from "../config";
import { $get, $post, $put, $delete, QueryParams } from "../base";
import { User, Push } from "../../models";
import {
    SignUp,
    SignIn,
    RequestResetPassword,
    CreatePassword,
    UpdatePassword,
    FavoriteService,
    VerifyAccessToken,
} from "./types";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/auth`;
}

async function signUp(data: SignUp): Promise<User> {
    return await $post({
        url: `${getBaseUrl()}/sign-up`,
        body: data,
    });
}

async function signIn(data: SignIn): Promise<User> {
    return await $post({
        url: `${getBaseUrl()}/sign-in`,
        body: data,
    });
}

async function signInWithGoogle(): Promise<any> {
    return await $get({
        url: `${getBaseUrl()}/google`,
    });
}

async function signInWithFacebook(): Promise<any> {
    return await $get({
        url: `${getBaseUrl()}/facebook`,
    });
}

async function signOut(): Promise<any> {
    return await $delete({
        url: `${getBaseUrl()}/sign-in`,
    });
}

async function verifyAccessToken(data: VerifyAccessToken): Promise<User> {
    return await $post({
        url: `${getBaseUrl()}/verify-access-token`,
        body: data,
    });
}

async function createPassword(data: CreatePassword): Promise<User> {
    return await $post({
        url: `${getBaseUrl()}/password`,
        body: data,
    });
}

async function updatePassword(data: UpdatePassword): Promise<User> {
    return await $put({
        url: `${getBaseUrl()}/password`,
        body: data,
    });
}

async function requestResetPassword(data: RequestResetPassword): Promise<any> {
    return await $post({
        url: `${getBaseUrl()}/request-reset-password`,
        body: data,
    });
}

async function getUserProfile(queryParams?: QueryParams): Promise<User> {
    return await $get({
        queryParams,
        url: `${getBaseUrl()}/profile`,
    });
}

async function updateUserProfile(payload: User): Promise<User> {
    return await $put({
        url: `${getBaseUrl()}/profile`,
        body: payload,
    });
}

async function addFavoriteEvent(data: FavoriteService): Promise<any> {
    return await $post({
        url: `${getBaseUrl()}/add-favorite-service`,
        body: data,
    });
}

async function removeFavoriteEvent(data: FavoriteService): Promise<any> {
    return await $post({
        url: `${getBaseUrl()}/remove-favorite-service`,
        body: data,
    });
}

async function registerDevice(payload: Push): Promise<User> {
    return await $post({
        url: `${getBaseUrl()}/register-device`,
        body: payload,
    });
}

async function delDevice(payload: Push): Promise<User> {
    return await $post({
        url: `${getBaseUrl()}/remove-device`,
        body: payload,
    });
}

async function reportNotifications(): Promise<any> {
    return await $post({
        url: `${getBaseUrl()}/report-notifications`,
    });
}

export default {
    signUp,
    signIn,
    signOut,
    createPassword,
    updatePassword,
    requestResetPassword,
    getUserProfile,
    updateUserProfile,
    addFavoriteEvent,
    removeFavoriteEvent,
    signInWithGoogle,
    signInWithFacebook,
    verifyAccessToken,
    registerDevice,
    delDevice,
    reportNotifications,
};
export {
    signUp,
    signIn,
    signOut,
    createPassword,
    updatePassword,
    requestResetPassword,
    getUserProfile,
    updateUserProfile,
    addFavoriteEvent,
    removeFavoriteEvent,
    signInWithGoogle,
    signInWithFacebook,
    verifyAccessToken,
    registerDevice,
    delDevice,
    reportNotifications,
};
