import { useEffect, useState } from "react";
import { getNotes } from "../apis/note";
import { Note } from "../types/note";

export default (lastId: number): Note[] => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await getNotes({ lastId });
    console.log("fetch notes res", res);

    res.data?.map((item) => {
      const note: Note = {
        id: item.id,
        ctime: {
          timestamp: 111,
          text: "xxx",
        },
        text: {
          content: item.content,
        },
        emoji: {
          text: "😄",
        },
      };

      setNotes((notes) => [...notes, note]);
    });
  };

  useEffect(() => {
    fetchNotes();
  }, [lastId]);

  return notes;
};
