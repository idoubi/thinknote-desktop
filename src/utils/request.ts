import { RequestMethod, RequestOptions, ResponseJson } from "../types/request";

const methodGet: RequestMethod = "GET";
const methodPost: RequestMethod = "POST";

export const request = async (
  method: RequestMethod,
  uri: string,
  headers?: Record<string, string>,
  body?: BodyInit
): Promise<ResponseJson> => {
  let options: RequestInit = {
    method: method,
    headers: headers,
  };

  if (method === methodPost) {
    options.body = body;
  }

  try {
    const response = await fetch(uri, options);
    const resp = await response.json();

    return Promise.resolve(resp);
  } catch (err) {
    const resp: ResponseJson = {
      code: -1,
      message: "request error",
    };

    return Promise.resolve(resp);
  }
};

export const get = async (
  uri: string,
  headers?: Record<string, string>
): Promise<ResponseJson> => {
  return request(methodGet, uri, headers);
};

export const postJson = async (
  uri: string,
  data?: {} | [],
  headers?: Record<string, string>
): Promise<ResponseJson> => {
  if (!headers) {
    headers = {};
  }

  headers["Content-Type"] = "application/json";

  let body = JSON.stringify(data);

  return request(methodPost, uri, headers, body);
};
