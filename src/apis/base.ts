import fetch from 'isomorphic-unfetch';
import * as qs from 'qs';
import { getConfig } from './config';
enum Method {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
}

interface QueryParams {
  readonly search?: string;
  readonly q?: string;
  readonly filter?: string;
  readonly select?: string;
  readonly populate?: string;
  readonly sort?: string;
  readonly direction?: string;
  readonly skip?: number;
  readonly limit?: number;
  readonly [key: string]: any; // tslint:disable-line: no-mixed-interface
}

interface Request {
  readonly url: string;
  readonly queryParams?: QueryParams;
  readonly body?: Object;
  readonly token?: any;
}

interface ExtendedRequest extends Request {
  readonly method: Method;
}

interface Count {
  readonly count: number;
}

function resolveUrl(url: string, queryParams?: QueryParams) {
  if (queryParams) {
    return `${url}${qs.stringify(queryParams, { addQueryPrefix: true })}`;
  }

  return url;
}

function resolveBody(method: Method, body: any) {
  if ([Method.Post, Method.Put, Method.Patch].includes(method) && body) {
    return JSON.stringify(body);
  }

  return undefined;
}

async function request(request: ExtendedRequest) {
  const { url, method, queryParams, body } = request;
  const token = request.token ? request.token : getConfig().token;

  const defaultHeader = {
    'Content-Type': 'application/json',
  };

  const res = await fetch(resolveUrl(url, queryParams), {
    method,
        // credentials: 'include',
    headers: token
            ? {
              ...defaultHeader,
              Authorization: `Bearer ${token}`,
            }
            : defaultHeader,
    body: resolveBody(method, body),
  });

  if (!res.ok) {
    throw await res.json();
  }

  return await res.json();
}

function $get(data: Request) {
  return request({ ...data, method: Method.Get });
}
function $post(data: Request) {
  return request({ ...data, method: Method.Post });
}
function $put(data: Request) {
  return request({ ...data, method: Method.Put });
}
function $patch(data: Request) {
  return request({ ...data, method: Method.Patch });
}
function $delete(data: Request) {
  return request({ ...data, method: Method.Delete });
}

export default {
  $get,
  $post,
  $put,
  $patch,
  $delete,
};
export { QueryParams, Request, Count, $get, $post, $put, $patch, $delete };
