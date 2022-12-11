import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ExitToApp as LogoutIcon, Settings as ConfigIcon, Home as HomeIcon } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";
import { useRouter } from "next/router";

const Appbar = () => {
  const { logout } = useLogout();
  const router = useRouter();
  const location = router.pathname.split("/")[1];

  const handleChangePage = () => {
    if (location === "configuration") {
      router.push("/");
    } else {
      router.push("/configuration");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            onClick={handleChangePage}
            color="inherit"
            startIcon={ location === "configuration" ? <HomeIcon /> : <ConfigIcon /> }
            sx={{ border: "1px solid white" }}
          >
            {location === "configuration" ? "Home" : "Configuration"}
          </Button>

          <Button
            onClick={logout}
            color="inherit"
            startIcon={<LogoutIcon />}
            sx={{ border: "1px solid white" }}
          >
            Sign Out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
