import { createContext, useRef, useState } from "react";
import { ContextProviderProps, ContextProviderValue } from "../types/context";
import {
  createNote as requestCreateNote,
  getNotes as requestGetNotes,
} from "../apis/note";
import { Note } from "../types/note";
import { NoteItem as ApiNote } from "../types/api";
import { transferNotesFromApi, transferNoteFromApi } from "../utils/transfer";

export const NoteContext = createContext({} as ContextProviderValue);

export const NoteContextProvider = ({ children }: ContextProviderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [notes, setNotes] = useState([] as Note[]);

  const notesBottomRef = useRef<null | HTMLDivElement>(null);

  const showDialog = (text: string) => {
    setDialogText(text);
    setIsDialogOpen(true);
  };

  const hideDialog = () => {
    setIsDialogOpen(false);
    setDialogText("");
  };

  // fetch notes
  const fetchNotes = async (lastId: number) => {
    const { code, message, data } = await requestGetNotes({ lastId });
    console.log("request fetch notes", code, message, data);
    if (data) {
      const newNotes = transferNotesFromApi(data as ApiNote[]);

      setNotes(newNotes.reverse());
    }
  };

  // create note
  const createNote = async (content: string) => {
    const { code, message, data } = await requestCreateNote({ content });
    console.log("request create note", code, message, data);
    if (data) {
      const newNote = transferNoteFromApi(data as ApiNote);

      // setNotes((notes) => [...notes, newNote]);
      fetchNotes(0);
    }

    return { code, message, data };
  };

  return (
    <NoteContext.Provider
      value={{
        isDialogOpen,
        dialogText,
        showDialog,
        hideDialog,
        notes,
        notesBottomRef,
        fetchNotes,
        createNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
