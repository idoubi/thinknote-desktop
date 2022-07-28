import {
  CheckLoginTicketReq,
  CheckLoginTicketResp,
  CreateNoteReq,
  CreateNoteResp,
  GetLoginQrcodeResp,
  GetNoteListReq,
  GetNoteListResp,
  GetUserProfileResp,
  UpdateUserProfileReq,
  UpdateUserProfileResp,
} from "../types/api";

import { get, postJson } from "../utils/request";
import { getTimestamp } from "../utils/util";

const API_GET_LOGIN_QRCODE = "/api/note/get-login-qrcode";
const API_CHECK_LOGIN_TICKET = "/api/note/check-login-ticket";
const API_GET_USER_PROFILE = "/api/note/get-user-profile";
const API_UPDATE_USER_PROFILE = "/api/note/update-user-profile";
const API_GET_NOTE_LIST = "/api/note/get-note-list";
const API_CREATE_NOTE = "/api/note/create-note";

const TOKEN_CACHE_KEY = "user_token";
const TOKEN_SPLITTER = ":::";

export const setTokenToCache = (token: string, expiresAt: number): void => {
  const tokenWithExpiresAt = `${token}${TOKEN_SPLITTER}${expiresAt}`;

  localStorage.setItem(TOKEN_CACHE_KEY, tokenWithExpiresAt);
};

export const getTokenFromCache = (): string | null => {
  const tokenWithExpiresAt = localStorage.getItem(TOKEN_CACHE_KEY);
  const tmpArr = tokenWithExpiresAt?.split(TOKEN_SPLITTER);

  if (tmpArr && tmpArr?.length > 1) {
    const [token, expiresAt] = tmpArr;
    // check expiresAt
    const now = getTimestamp();
    if (now < parseInt(expiresAt)) {
      return token;
    }
  }

  return null;
};

export const getAuthHeaders = (): Record<string, string> => {
  let headers: Record<string, string> = {
    "X-Auth-AppId": "22004",
  };

  const token = getTokenFromCache();
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  return headers;
};

export const getLoginQrcode = async (): Promise<GetLoginQrcodeResp> => {
  const uri = API_GET_LOGIN_QRCODE;

  return get(uri);
};

export const checkLoginTicket = async (
  data: CheckLoginTicketReq
): Promise<CheckLoginTicketResp> => {
  const uri = API_CHECK_LOGIN_TICKET;

  return postJson(uri, data);
};

export const getUserProfile = async (): Promise<GetUserProfileResp> => {
  const uri = API_GET_USER_PROFILE;

  return get(uri, getAuthHeaders());
};

export const updateUserProfile = async (
  data: UpdateUserProfileReq
): Promise<UpdateUserProfileResp> => {
  const uri = API_UPDATE_USER_PROFILE;

  return postJson(uri, data, getAuthHeaders());
};

export const getNotes = async (
  req: GetNoteListReq
): Promise<GetNoteListResp> => {
  const uri = API_GET_NOTE_LIST + "?lastId=" + req.lastId;

  return get(uri, getAuthHeaders());
};

export const createNote = async (
  data: CreateNoteReq
): Promise<CreateNoteResp> => {
  const uri = API_CREATE_NOTE;

  return postJson(uri, data, getAuthHeaders());
};
