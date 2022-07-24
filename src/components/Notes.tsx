import { useContext, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";
import { Note } from "../types";
import NoteItem from "./NoteItem";

export default () => {
  const { notes, fetchNotes } = useContext(NoteContext);

  // fetch notes at the first time
  useEffect(() => {
    fetchNotes(0);
  }, []);

  return (
    <div className="notes">
      {notes.map((note: Note) => (
        <NoteItem {...note} />
      ))}
    </div>
  );
};
