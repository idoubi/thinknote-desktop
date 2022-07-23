import { useContext, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { NoteContext } from "../context/NoteContext";
import { Note } from "../types/note";

export default function RecipeReviewCard() {
  const { notes, fetchNotes } = useContext(NoteContext);

  // fetch notes at the first time
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      {notes.map(({ id, ctime, text, emoji }: Note) => (
        <Card style={{ marginBottom: "1em" }} key={id}>
          <CardHeader
            // avatar={<Avatar aria-label="recipe">{id}</Avatar>}
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            subheader={id.toString()}
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
