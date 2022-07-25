import { useContext, useEffect, useRef } from "react";
import { NoteContext } from "../context/NoteContext";
import { Note } from "../types/note";
import NoteItem from "./NoteItem";

export default () => {
  const { notes, notesBottomRef, fetchNotes } = useContext(NoteContext);

  // fetch notes at the first time
  useEffect(() => {
    fetchNotes(0);
  }, []);

  useEffect(() => {
    notesBottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [notes]);

  return (
    <>
      <div className="notes">
        {notes.map((note: Note) => (
          <NoteItem note={note} key={note.id} />
        ))}

        <div className="bottom" ref={notesBottomRef}></div>
      </div>
    </>
  );
};
