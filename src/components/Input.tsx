import React, { useContext, useRef, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import SearchIcon from "@mui/icons-material/Search";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import DirectionsIcon from "@mui/icons-material/Directions";
import { NoteContext } from "../context/NoteContext";

export default () => {
  const [noteContent, setNoteContent] = useState("");
  const noteInput = useRef();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteContent(e.target.value);
  };

  const createNoteHandler = () => {
    console.log(noteContent);
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
        <FaceRetouchingNaturalIcon />
      </IconButton>
      <InputBase
        ref={noteInput}
        sx={{ ml: 1, flex: 1 }}
        placeholder="记录你此刻的想法..."
        inputProps={{ "aria-label": "input things" }}
        value={noteContent}
        onChange={inputChangeHandler}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={createNoteHandler}
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
};
