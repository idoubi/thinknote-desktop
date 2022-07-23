import React, { useContext, useRef, useState, useEffect } from "react";
import { Paper, InputBase, Divider, IconButton } from "@mui/material";
import {
  AddReaction,
  Search,
  FaceRetouchingNatural,
  Directions,
} from "@mui/icons-material";
import { NoteContext } from "../context/NoteContext";

export default () => {
  const [noteContent, setNoteContent] = useState("");
  const { createNote } = useContext(NoteContext);
  const noteInput = useRef(null);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteContent(e.target.value);
  };

  const createNoteHandler = () => {
    console.log("current note content:", noteContent);

    createNote(noteContent);
  };

  useEffect(() => {
    console.log("input object", noteInput.current);
    noteInput.current?.focus();
  }, []);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 0px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginBottom: "2em",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <FaceRetouchingNatural />
      </IconButton>
      <InputBase
        ref={noteInput}
        sx={{ ml: 1, flex: 1 }}
        placeholder="记录你此刻的想法..."
        inputProps={{ "aria-label": "input things" }}
        value={noteContent}
        onChange={inputChangeHandler}
      />
      {/* <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton> */}
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={createNoteHandler}
      >
        <Directions />
      </IconButton>
    </Paper>
  );
};
