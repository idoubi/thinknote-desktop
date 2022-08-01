import { useContext, useEffect, useRef } from "react";
import { NoteContext } from "../context/NoteContext";
import { Note } from "../types/note";
import NoteItem from "./NoteItem";

export default () => {
  const { notes, fetchNotes } = useContext(NoteContext);
  const notesBottomRef = useRef<null | HTMLDivElement>(null);

  const scrollHandler = (e: Event) => {
    console.log("scroll");
  };

  // fetch notes at the first time
  useEffect(() => {
    fetchNotes(0);

    console.log("add scroll", scrollHandler);
    window.addEventListener("scroll", scrollHandler);
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
