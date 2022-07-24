import { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { NoteContext } from "../context/NoteContext";

export default () => {
  const { isDialogOpen, dialogText, hideDialog } = useContext(NoteContext);

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={hideDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" minWidth={200}>
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDialog}>知道了</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
