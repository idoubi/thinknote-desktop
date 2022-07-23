export type RequestMethod = "GET" | "POST";

export interface RequestOptions {
  apiBaseUri?: string;
  timeout?: number;
}

export interface ResponseJson {
  code: number;
  message: string;
  data?: any;
}
