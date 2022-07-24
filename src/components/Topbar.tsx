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

export default function ButtonAppBar() {
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            想记
          </Typography>
          <Button color="inherit">
            <Avatar
              alt="avatar"
              src="https://blogcdn.idoustudio.com/idoubi.jpeg"
            />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
