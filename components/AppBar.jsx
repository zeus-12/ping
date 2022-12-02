import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ExitToApp as LogoutIcon } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";

const Appbar = () => {
  const { logout } = useLogout();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Button
          onClick={logout}
          color="inherit"
          startIcon={<LogoutIcon />}
          sx={{ border: "1px solid white" }}
        >
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
