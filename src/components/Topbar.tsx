import { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NoteContext } from "../context/NoteContext";

export default () => {
  const { user, userLogin } = useContext(NoteContext);
  console.log("userinfo", user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            &nbsp;
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            想记
          </Typography>
          <Button color="inherit">
            <Avatar alt="avatar" src={user.avatar_url} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
