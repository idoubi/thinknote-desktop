import { RequestMethod, ResponseJson } from "../types/request";
import {
  Body,
  FetchOptions,
  fetch as DesktopFetch,
} from "@tauri-apps/api/http";
import { platform, apiBaseUri } from "./env";

import { info } from "./log";

const methodGet: RequestMethod = "GET";
const methodPost: RequestMethod = "POST";

// web request
export const request = async (
  method: RequestMethod,
  uri: string,
  headers?: Record<string, any>,
  data?: Record<any, any>
): Promise<ResponseJson> => {
  // use desktop request
  if (platform === "desktop") {
    return desktopRequest(method, uri, headers, data);
  }

  const url = apiBaseUri + uri;

  let options: RequestInit = {
    method: method,
  };

  if (!headers) {
    headers = {};
  }

  if (method === methodPost) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  options.headers = headers;

  try {
    const response = await fetch(url, options);
    const resp = await response.json();

    return Promise.resolve(resp);
  } catch (err) {
    console.log("request error:", err);
    const resp: ResponseJson = {
      code: -1,
      message: "request error",
    };

    return Promise.resolve(resp);
  }
};

// desktop request
export const desktopRequest = async (
  method: RequestMethod,
  uri: string,
  headers?: Record<string, any>,
  data?: Record<any, any>
): Promise<ResponseJson> => {
  info("desktop ready to request api");

  const url = apiBaseUri + uri;

  let options: FetchOptions = {
    method: method,
  };

  if (!headers) {
    headers = {};
  }

  if (method === methodPost) {
    headers["Content-Type"] = "application/json";
    options.body = Body.json(data as Record<any, any>);
  }

  options.headers = headers;

  console.log("desktop request:", url, options);

  try {
    const response = await DesktopFetch(url, options);
    info("desktop request res:" + JSON.stringify(response.data));

    const resp = response.data as ResponseJson;

    return Promise.resolve(resp);
  } catch (err) {
    info("desktop request error:" + url + err);

    const resp: ResponseJson = {
      code: -1,
      message: "request error",
    };

    return Promise.resolve(resp);
  }
};

export const get = async (
  uri: string,
  headers?: Record<string, any>
): Promise<ResponseJson> => {
  return request(methodGet, uri, headers);
};

export const post = async (
  uri: string,
  data?: Record<any, any>,
  headers?: Record<string, any>
): Promise<ResponseJson> => {
  return request(methodPost, uri, headers, data);
};
