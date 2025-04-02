'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fetch = _interopDefault(require('isomorphic-unfetch'));
var qs = require('qs');

let __BCN_API_CONFIG__ = {}; // tslint:disable-line: no-let
function getConfig() {
    return Object.assign({}, __BCN_API_CONFIG__);
}
function setConfig(cfg = {}) {
    __BCN_API_CONFIG__ = Object.assign({}, cfg);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var Method;
(function (Method) {
    Method["Get"] = "GET";
    Method["Post"] = "POST";
    Method["Put"] = "PUT";
    Method["Patch"] = "PATCH";
    Method["Delete"] = "DELETE";
})(Method || (Method = {}));
function resolveUrl(url, queryParams) {
    if (queryParams) {
        return `${url}${qs.stringify(queryParams, { addQueryPrefix: true })}`;
    }
    return url;
}
function resolveBody(method, body) {
    if ([Method.Post, Method.Put, Method.Patch].includes(method) && body) {
        return JSON.stringify(body);
    }
    return undefined;
}
function request(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url, method, queryParams, body } = request;
        const token = request.token ? request.token : getConfig().token;
        const defaultHeader = {
            'Content-Type': 'application/json',
        };
        const res = yield fetch(resolveUrl(url, queryParams), {
            method,
            // credentials: 'include',
            headers: token
                ? Object.assign(Object.assign({}, defaultHeader), { Authorization: `Bearer ${token}` }) : defaultHeader,
            body: resolveBody(method, body),
        });
        if (!res.ok) {
            throw yield res.json();
        }
        return yield res.json();
    });
}
function $get(data) {
    return request(Object.assign(Object.assign({}, data), { method: Method.Get }));
}
function $post(data) {
    return request(Object.assign(Object.assign({}, data), { method: Method.Post }));
}
function $put(data) {
    return request(Object.assign(Object.assign({}, data), { method: Method.Put }));
}
function $delete(data) {
    return request(Object.assign(Object.assign({}, data), { method: Method.Delete }));
}

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/auth`;
}
function signUp(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/sign-up`,
            body: data,
        });
    });
}
function signIn(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/sign-in`,
            body: data,
        });
    });
}
function signInWithGoogle() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            url: `${getBaseUrl()}/google`,
        });
    });
}
function signInWithFacebook() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            url: `${getBaseUrl()}/facebook`,
        });
    });
}
function signOut() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $delete({
            url: `${getBaseUrl()}/sign-in`,
        });
    });
}
function verifyAccessToken(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/verify-access-token`,
            body: data,
        });
    });
}
function createPassword(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/password`,
            body: data,
        });
    });
}
function updatePassword(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $put({
            url: `${getBaseUrl()}/password`,
            body: data,
        });
    });
}
function requestResetPassword(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/request-reset-password`,
            body: data,
        });
    });
}
function getUserProfile(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: `${getBaseUrl()}/profile`,
        });
    });
}
function updateUserProfile(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $put({
            url: `${getBaseUrl()}/profile`,
            body: payload,
        });
    });
}
function addFavoriteEvent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/add-favorite-service`,
            body: data,
        });
    });
}
function removeFavoriteEvent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/remove-favorite-service`,
            body: data,
        });
    });
}
function registerDevice(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/register-device`,
            body: payload,
        });
    });
}
function delDevice(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/remove-device`,
            body: payload,
        });
    });
}
function reportNotifications() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl()}/report-notifications`,
        });
    });
}
var auth = {
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

var auth$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': auth,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    createPassword: createPassword,
    updatePassword: updatePassword,
    requestResetPassword: requestResetPassword,
    getUserProfile: getUserProfile,
    updateUserProfile: updateUserProfile,
    addFavoriteEvent: addFavoriteEvent,
    removeFavoriteEvent: removeFavoriteEvent,
    signInWithGoogle: signInWithGoogle,
    signInWithFacebook: signInWithFacebook,
    verifyAccessToken: verifyAccessToken,
    registerDevice: registerDevice,
    delDevice: delDevice,
    reportNotifications: reportNotifications
});



var types = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function getBaseUrl$1() {
    return `${getConfig().bcnApiUrl}/users`;
}
function list(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: getBaseUrl$1(),
        });
    });
}
function count(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count } = yield $get({
            queryParams,
            url: `${getBaseUrl$1()}/count`,
        });
        return count;
    });
}
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: getBaseUrl$1(),
            body: data,
        });
    });
}
function get(id, queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: `${getBaseUrl$1()}/${id}`,
        });
    });
}
function update(_a) {
    var { id } = _a, data = __rest(_a, ["id"]);
    return __awaiter(this, void 0, void 0, function* () {
        return yield $put({
            url: `${getBaseUrl$1()}/${id}`,
            body: data,
        });
    });
}
function del(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $delete({
            url: `${getBaseUrl$1()}/${id}`,
        });
    });
}
function togglePerm(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$1()}/${id}/toggle-perm`,
        });
    });
}
function togglePermSupperUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$1()}/${id}/toggle-perm-supper-user`,
        });
    });
}
function setPermission(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$1()}/${id}/set-permission`,
            body: data,
        });
    });
}
var users = {
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

var users$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': users,
    list: list,
    count: count,
    create: create,
    get: get,
    update: update,
    del: del,
    togglePerm: togglePerm,
    togglePermSupperUser: togglePermSupperUser,
    setPermission: setPermission
});



var types$1 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function getBaseUrl$2() {
    return `${getConfig().bcnApiUrl}/services`;
}
function list$1(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: getBaseUrl$2(),
        });
    });
}
function count$1(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count } = yield $get({
            queryParams,
            url: `${getBaseUrl$2()}/count`,
        });
        return count;
    });
}
function create$1(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: getBaseUrl$2(),
            body: data,
        });
    });
}
function get$1(id, queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: `${getBaseUrl$2()}/${id}`,
        });
    });
}
function update$1(_a) {
    var { id } = _a, data = __rest(_a, ["id"]);
    return __awaiter(this, void 0, void 0, function* () {
        return yield $put({
            url: `${getBaseUrl$2()}/${id}`,
            body: data,
        });
    });
}
function del$1(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $delete({
            url: `${getBaseUrl$2()}/${id}`,
        });
    });
}
function likes(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$2()}/${id}/likes`,
        });
    });
}
function approveServices(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$2()}/approve-services`,
            body: data,
        });
    });
}
function removeServices(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$2()}/remove-services`,
            body: data,
        });
    });
}
function listBeds() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            url: `${getBaseUrl$2()}/beds`,
        });
    });
}
function updateAvailableBeds(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$2()}/update-available-beds`,
            body: data,
        });
    });
}
function searchCityOrZip(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$2()}/search-city-or-zip`,
            body: data,
        });
    });
}
var services = {
    list: list$1,
    count: count$1,
    create: create$1,
    get: get$1,
    update: update$1,
    del: del$1,
    likes,
    approveServices,
    removeServices,
    listBeds,
    updateAvailableBeds,
    searchCityOrZip,
};

var services$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': services,
    list: list$1,
    count: count$1,
    create: create$1,
    get: get$1,
    update: update$1,
    del: del$1,
    likes: likes,
    approveServices: approveServices,
    removeServices: removeServices,
    listBeds: listBeds,
    updateAvailableBeds: updateAvailableBeds,
    searchCityOrZip: searchCityOrZip
});



var types$2 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function getBaseUrl$3() {
    return `${getConfig().bcnApiUrl}/crisis-lines`;
}
function list$2(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: getBaseUrl$3(),
        });
    });
}
function count$2(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count } = yield $get({
            queryParams,
            url: `${getBaseUrl$3()}/count`,
        });
        return count;
    });
}
function create$2(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: getBaseUrl$3(),
            body: data,
        });
    });
}
function get$2(id, queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: `${getBaseUrl$3()}/${id}`,
        });
    });
}
function update$2(_a) {
    var { id } = _a, data = __rest(_a, ["id"]);
    return __awaiter(this, void 0, void 0, function* () {
        return yield $put({
            url: `${getBaseUrl$3()}/${id}`,
            body: data,
        });
    });
}
function del$2(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $delete({
            url: `${getBaseUrl$3()}/${id}`,
        });
    });
}
var crisisLines = {
    list: list$2,
    count: count$2,
    create: create$2,
    get: get$2,
    update: update$2,
    del: del$2,
};

var crisisLines$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': crisisLines,
    list: list$2,
    count: count$2,
    create: create$2,
    get: get$2,
    update: update$2,
    del: del$2
});



var types$3 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function getBaseUrl$4() {
    return `${getConfig().bcnApiUrl}/feedbacks`;
}
function list$3(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: getBaseUrl$4(),
        });
    });
}
function count$3(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count } = yield $get({
            queryParams,
            url: `${getBaseUrl$4()}/count`,
        });
        return count;
    });
}
function createServiceFeedBack(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$4()}/service`,
            body: data,
        });
    });
}
function createAppFeedback(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$4()}/app`,
            body: data,
        });
    });
}
function get$3(id, queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: `${getBaseUrl$4()}/${id}`,
        });
    });
}
function archive(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$4()}/${id}/archive`,
        });
    });
}
function del$3(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $delete({
            url: `${getBaseUrl$4()}/${id}`,
        });
    });
}
var feedbacks = {
    list: list$3,
    count: count$3,
    createServiceFeedBack,
    createAppFeedback,
    get: get$3,
    archive,
    del: del$3,
};

var feedbacks$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': feedbacks,
    list: list$3,
    count: count$3,
    createServiceFeedBack: createServiceFeedBack,
    createAppFeedback: createAppFeedback,
    get: get$3,
    archive: archive,
    del: del$3
});



var types$4 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function getBaseUrl$5() {
    return `${getConfig().bcnApiUrl}/files`;
}
function get$4(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            url: `${getBaseUrl$5()}/${fileName}`,
        });
    });
}
var files = {
    get: get$4,
};

var files$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': files,
    get: get$4
});

function getBaseUrl$6() {
    return `${getConfig().bcnApiUrl}/bot`;
}
function query(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$6()}/query`,
            body: data,
        });
    });
}
var bot = {
    query,
};

var bot$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': bot,
    query: query
});

function getBaseUrl$7() {
    return `${getConfig().bcnApiUrl}/static-pages`;
}
function list$4(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: getBaseUrl$7(),
        });
    });
}
function count$4(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count } = yield $get({
            queryParams,
            url: `${getBaseUrl$7()}/count`,
        });
        return count;
    });
}
function create$3(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$7()}`,
            body: data,
        });
    });
}
function get$5(code, queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: `${getBaseUrl$7()}/${code}`,
        });
    });
}
function update$3(code) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $put({
            url: `${getBaseUrl$7()}/${code}`,
        });
    });
}
function del$4(code) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $delete({
            url: `${getBaseUrl$7()}/${code}`,
        });
    });
}
var staticPages = {
    list: list$4,
    count: count$4,
    create: create$3,
    get: get$5,
    update: update$3,
    del: del$4,
};

var staticPages$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': staticPages,
    list: list$4,
    count: count$4,
    create: create$3,
    get: get$5,
    update: update$3,
    del: del$4
});



var types$5 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function getBaseUrl$8() {
    return `${getConfig().bcnApiUrl}/liaisons`;
}
function list$5(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: getBaseUrl$8(),
        });
    });
}
function count$5(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count } = yield $get({
            queryParams,
            url: `${getBaseUrl$8()}/count`,
        });
        return count;
    });
}
function create$4(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$8()}`,
            body: data,
        });
    });
}
function get$6(id, queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: `${getBaseUrl$8()}/${id}`,
        });
    });
}
function update$4(_a) {
    var { id } = _a, data = __rest(_a, ["id"]);
    return __awaiter(this, void 0, void 0, function* () {
        return yield $put({
            url: `${getBaseUrl$8()}/${id}`,
            body: data,
        });
    });
}
function del$5(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $delete({
            url: `${getBaseUrl$8()}/${id}`,
        });
    });
}
var liaisons = {
    list: list$5,
    count: count$5,
    create: create$4,
    get: get$6,
    update: update$4,
    del: del$5,
};

var liaisons$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': liaisons,
    list: list$5,
    count: count$5,
    create: create$4,
    get: get$6,
    update: update$4,
    del: del$5
});



var types$6 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function getBaseUrl$9() {
    return `${getConfig().bcnApiUrl}/regions`;
}
function list$6(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: getBaseUrl$9(),
        });
    });
}
function count$6(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count } = yield $get({
            queryParams,
            url: `${getBaseUrl$9()}/count`,
        });
        return count;
    });
}
function create$5(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$9()}`,
            body: data,
        });
    });
}
function get$7(id, queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: `${getBaseUrl$9()}/${id}`,
        });
    });
}
function update$5(_a) {
    var { id } = _a, data = __rest(_a, ["id"]);
    return __awaiter(this, void 0, void 0, function* () {
        return yield $put({
            url: `${getBaseUrl$9()}/${id}`,
            body: data,
        });
    });
}
function del$6(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $delete({
            url: `${getBaseUrl$9()}/${id}`,
        });
    });
}
var regions = {
    list: list$6,
    count: count$6,
    create: create$5,
    get: get$7,
    update: update$5,
    del: del$6,
};

var regions$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': regions,
    list: list$6,
    count: count$6,
    create: create$5,
    get: get$7,
    update: update$5,
    del: del$6
});



var types$7 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function getBaseUrl$a() {
    return `${getConfig().bcnApiUrl}/units`;
}
function list$7(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: getBaseUrl$a(),
        });
    });
}
function count$7(queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count } = yield $get({
            queryParams,
            url: `${getBaseUrl$a()}/count`,
        });
        return count;
    });
}
function create$6(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: `${getBaseUrl$a()}`,
            body: data,
        });
    });
}
function get$8(id, queryParams) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $get({
            queryParams,
            url: `${getBaseUrl$a()}/${id}`,
        });
    });
}
function update$6(_a) {
    var { id } = _a, data = __rest(_a, ["id"]);
    return __awaiter(this, void 0, void 0, function* () {
        return yield $put({
            url: `${getBaseUrl$a()}/${id}`,
            body: data,
        });
    });
}
function del$7(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $delete({
            url: `${getBaseUrl$a()}/${id}`,
        });
    });
}
var units = {
    list: list$7,
    count: count$7,
    create: create$6,
    get: get$8,
    update: update$6,
    del: del$7,
};

var units$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': units,
    list: list$7,
    count: count$7,
    create: create$6,
    get: get$8,
    update: update$6,
    del: del$7
});



var types$8 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

function getBaseUrl$b() {
    return `${getConfig().bcnApiUrl}/common/translate`;
}
function translate(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield $post({
            url: getBaseUrl$b(),
            body: data,
        });
    });
}
var common = {
    translate,
};

var common$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': common,
    translate: translate
});

function initApi(cfg) {
    setConfig(cfg);
}

exports.AuthApi = auth$1;
exports.AuthApiTypes = types;
exports.BotApi = bot$1;
exports.CommonApi = common$1;
exports.CrisisLinesApi = crisisLines$1;
exports.CrisisLinesApiTypes = types$3;
exports.FeedbacksApi = feedbacks$1;
exports.FeedbacksApiTypes = types$4;
exports.FilesApi = files$1;
exports.LiaisonsApi = liaisons$1;
exports.LiaisonsApiTypes = types$6;
exports.RegionsApi = regions$1;
exports.RegionsApiTypes = types$7;
exports.ServicesApi = services$1;
exports.ServicesApiTypes = types$2;
exports.StaticPagesApi = staticPages$1;
exports.StaticPagesApiTypes = types$5;
exports.UnitsApi = units$1;
exports.UnitsApiTypes = types$8;
exports.UsersApi = users$1;
exports.UsersApiTypes = types$1;
exports.initApi = initApi;
//# sourceMappingURL=index.js.map
