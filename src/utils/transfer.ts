import { NoteItem, Notes } from "../types/api";
import { Note } from "../types/note";

export const transferNoteFromApi = (apiNote: NoteItem): Note => {
  return {
    id: apiNote.id,
    ctime: {
      timestamp: 0,
      text: apiNote.created_at,
    },
    text: {
      content: apiNote.content,
    },
  };
};

export const transferNotesFromApi = (apiNotes: Notes): Note[] => {
  let notes: Note[] = [];

  apiNotes.map((item) => {
    notes.push(transferNoteFromApi(item));
  });

  return notes;
};
