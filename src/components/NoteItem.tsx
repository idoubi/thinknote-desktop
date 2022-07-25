import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { NoteProps } from "../types/note";

export default ({ note }: NoteProps) => {
  return (
    <Card className="item">
      <CardHeader
        avatar={
          <Avatar
            src="https://blogcdn.idoustudio.com/idoubi.jpeg"
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="艾逗笔"
        subheader={note.ctime.text}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {note.text?.content}
        </Typography>
      </CardContent>
    </Card>
  );
};
