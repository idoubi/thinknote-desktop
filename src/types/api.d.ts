import { ResponseJson } from "./request";

export interface UserProfile {
  id: number;
  nickname: string;
  avatar_url: string;
}

export interface LoginQrcode {
  ticket: string;
  qrcode_url: string;
}

export interface LoginToken {
  token: string;
  expires_at: number;
}

export interface NoteItem {
  id: number;
  content: string;
  created_at: string;
}

export type Notes = NoteItem[];

export interface GetNoteListReq {
  lastId: number;
}

export interface GetNoteListResp extends ResponseJson {
  data?: Notes;
}

export interface CreateNoteReq {
  content: string;
}

export interface CreateNoteResp extends ResponseJson {
  data?: NoteItem;
}

export interface GetUserProfileResp extends ResponseJson {
  data?: UserProfile;
}

export interface UpdateUserProfileReq {
  nickname: string;
  avatar_url: string;
}

export interface UpdateUserProfileResp extends ResponseJson {
  data?: UserProfile;
}

export interface GetLoginQrcodeResp extends ResponseJson {
  data?: LoginQrcode;
}

export interface CheckLoginTicketReq {
  ticket: string;
}

export interface CheckLoginTicketResp extends ResponseJson {
  data?: LoginToken;
}
