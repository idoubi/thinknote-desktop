import { useContext, useEffect, useRef } from "react";
import { NoteContext } from "../context/NoteContext";
import { Note } from "../types/note";
import { Notes } from "../types/api";
import { getNotes } from "../apis/note";
import { transferNotesFromApi } from "../utils/transfer";
import NoteItem from "./NoteItem";

export default () => {
  const { notes, setNotes } = useContext(NoteContext);
  const notesBottomRef = useRef<null | HTMLDivElement>(null);

  // fetch notes
  const fetchNotes = async (lastId: number) => {
    const { code, message, data } = await getNotes({ lastId });
    console.log("fetch notes:", lastId, code, message, data);
    if (code === 0 && data) {
      const newNotes = transferNotesFromApi(data as Notes);

      setNotes(newNotes.reverse());
    }
  };

  const scrollHandler = (e) => {
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
