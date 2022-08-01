import { useState, useContext, MouseEvent } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { NoteContext } from "../context/NoteContext";
import { appName } from "../utils/env";
import { deleteTokenFromCache } from "../apis/note";

export default () => {
  const { user, setUser } = useContext(NoteContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const hideMenu = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setUser({});
    deleteTokenFromCache();
    hideMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openMenu}
          >
            <Avatar alt={user.nickname} src={user.avatar_url} />
          </IconButton>
          {user.id && (
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
              <MenuItem onClick={logout}>退出登录</MenuItem>
            </Menu>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {appName}
          </Typography>
          <Button color="inherit">{user.nickname}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
