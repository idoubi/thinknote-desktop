import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { NoteContext } from "../context/NoteContext";

import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import useNotes from "../hooks/useNotes";
// await appWindow.setSize(new LogicalSize(600, 800));

export default function RecipeReviewCard() {
  const notes = useNotes(0);
  console.log("notes", notes);
  return (
    <>
      {notes.map(({ id, ctime, text, emoji }) => (
        <Card style={{ marginBottom: "1em" }} key={id}>
          <CardHeader
            avatar={<Avatar aria-label="recipe">{emoji?.text}</Avatar>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            subheader={ctime.text}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {text?.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
