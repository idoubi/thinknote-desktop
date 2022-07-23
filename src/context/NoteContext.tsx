import { createContext, useEffect, useState } from "react";
import { Note } from "../types/note";
import { NoteItem as ApiNote } from "../types/api";
import { ContextProviderProps, ContextProviderValue } from "../types/context";
import {
  createNote as requestCreateNote,
  getNotes as requestGetNotes,
} from "../apis/note";
import { transferNotesFromApi, transferNoteFromApi } from "../utils/transfer";

export const NoteContext = createContext({} as ContextProviderValue);

export const NoteContextProvider = ({ children }: ContextProviderProps) => {
  const [notes, setNotes] = useState([] as Note[]);

  // fetch notes
  const fetchNotes = async (lastId: number) => {
    const { code, message, data } = await requestGetNotes({ lastId });
    console.log("request fetch notes", code, message, data);
    if (data) {
      const newNotes = transferNotesFromApi(data as ApiNote[]);

      setNotes(newNotes);
    }
  };

  // create note
  const createNote = async (content: string) => {
    const { code, message, data } = await requestCreateNote({ content });
    console.log("request create note", code, message, data);
    if (data) {
      const newNote = transferNoteFromApi(data as ApiNote);

      setNotes((notes) => [...notes, newNote]);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        fetchNotes,
        createNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
