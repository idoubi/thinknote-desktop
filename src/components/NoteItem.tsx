import { useState, MouseEvent, useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Menu,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { NoteProps } from "../types/note";
import { NoteContext } from "../context/NoteContext";
import { deleteNote } from "../apis/note";

export default ({ note }: NoteProps) => {
  const { showDialog, fetchNotes } = useContext(NoteContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const hideMenu = () => {
    setAnchorEl(null);
  };

  const deleteNoteHandler = async (id: number) => {
    const { code, message, data } = await deleteNote({ id });
    console.log("delete note:", code, message, data);
    if (code !== 0) {
      showDialog("删除失败：" + message);
      return;
    }

    // showDialog("删除成功");
    fetchNotes(0);
  };

  return (
    <Card className="item">
      <CardHeader
        // avatar={
        //   <Avatar
        //     src="https://blogcdn.idoustudio.com/idoubi.jpeg"
        //     sx={{ bgcolor: red[500] }}
        //     aria-label="recipe"
        //   />
        // }
        action={
          <>
            <IconButton aria-label="settings" onClick={openMenu}>
              <MoreVert />
            </IconButton>
            <Menu
              sx={{ mt: "38px" }}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={hideMenu}
            >
              <MenuItem onClick={() => deleteNoteHandler(note.id)}>
                删除
              </MenuItem>
            </Menu>
          </>
        }
        // title="艾逗笔"
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
