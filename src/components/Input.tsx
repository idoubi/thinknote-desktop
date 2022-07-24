import { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default () => {
  const { showDialog, createNote } = useContext(NoteContext);
  const [noteContent, setNoteContent] = useState("");
  const inputRef = useRef(null);

  const inputOnChange = (e) => {
    setNoteContent(e.target.value);
  };

  const submitHandler = async () => {
    if (noteContent.trim() === "") {
      showDialog("内容不能为空");
      return;
    }

    const { code, message, data } = await createNote(noteContent);
    console.log("create note:", code, message, data);
    showDialog("发送成功");

    setNoteContent("");
    inputRef.current?.focus();
  };

  return (
    <div className="input">
      <TextField
        className="input"
        label="记录你此刻的想法..."
        multiline
        maxRows={4}
        value={noteContent}
        onChange={inputOnChange}
      />
      <Button
        className="submit"
        variant="outlined"
        size="small"
        onClick={submitHandler}
      >
        <SendIcon />
      </Button>
    </div>
  );
};
