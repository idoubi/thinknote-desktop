import { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default () => {
  const { showDialog, notes, createNote, notesBottomRef } =
    useContext(NoteContext);
  const [noteContent, setNoteContent] = useState("");
  const inputRef = useRef<null | HTMLDivElement>(null);

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
    if (noteContent.trim() === "") {
      showDialog("内容不能为空");
      return;
    }

    const { code, message, data } = await createNote(noteContent);
    console.log("create note:", code, message, data);

    setNoteContent("");
    inputRef.current?.focus();

    notesBottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
    console.log("input ref", inputRef.current);
  }, [notes]);

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
        ref={inputRef}
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
