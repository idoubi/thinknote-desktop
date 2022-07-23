import {
  NoteCreateReq,
  NoteCreateResp,
  NoteListReq,
  NoteListResp,
} from "../types/api";

import { get, postJson } from "../utils/request";

const API_NOTE_LIST = "/api/note/lists";
const API_NOTE_CREATE = "/api/note/create";

export const getNotes = async (req: NoteListReq): Promise<NoteListResp> => {
  const uri = API_NOTE_LIST + "?lastId=" + req.lastId;

  return get(uri);
};

export const createNote = async (
  req: NoteCreateReq
): Promise<NoteCreateResp> => {
  const uri = API_NOTE_CREATE;

  const data = {
    content: req.content,
  };

  return postJson(uri, data);
};
