import { ResponseJson } from "./request";

export interface NoteItem {
  id: number;
  content: string;
}

export type Notes = NoteItem[];

export interface NoteListReq {
  lastId: number;
}

export interface NoteListResp extends ResponseJson {
  data?: Notes;
}

export interface NoteCreateReq {
  content: string;
}

export interface NoteCreateResp extends ResponseJson {
  data?: Note;
}
