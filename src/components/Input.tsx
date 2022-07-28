import { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { createNote } from "../apis/note";
import { transferNoteFromApi } from "../utils/transfer";
import { NoteItem } from "../types/api";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default () => {
  const { showDialog, user, notes, setNotes } = useContext(NoteContext);
  const [noteContent, setNoteContent] = useState("");
  const inputRef = useRef<null | HTMLDivElement>(null);

  // create note
  const createNoteHandler = async (content: string) => {
    const { code, message, data } = await createNote({ content });
    console.log("request create note", content, code, message, data);
    if (code === 0 && data) {
      const newNote = transferNoteFromApi(data as NoteItem);

      setNotes((notes: NoteItem[]) => [...notes, newNote]);
      // fetchNotes(0);

      setNoteContent("");

      return;
    }

    showDialog("发布失败：" + message);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteContent(e.target.value);
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 只有单独按 Enter，才会提交。Shift + Enter 会换行
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitHandler();
    }
  };

  const submitHandler = async () => {
    if (!user || !user.id) {
      showDialog("请先登录");
      console.log(inputRef);
      return;
    }
    if (noteContent.trim() === "") {
      showDialog("内容不能为空");
      return;
    }

    await createNoteHandler(noteContent);
  };

  useEffect(() => {
    inputRef.current?.focus();
    console.log("input ref", inputRef.current);
  }, []);

  return (
    <div className="input">
      <TextField
        className="input"
        label="记录你此刻的想法..."
        multiline
        maxRows={4}
        value={noteContent}
        onChange={inputOnChange}
        onKeyDown={inputOnKeyDown}
        inputRef={inputRef}
      />
      {/* <Button
        className="submit"
        variant="outlined"
        size="small"
        onClick={submitHandler}
      >
        <SendIcon />
      </Button> */}
    </div>
  );
};
