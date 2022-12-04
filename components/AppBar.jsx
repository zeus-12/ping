import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { CameraAltSharp, ExitToApp as LogoutIcon } from "@mui/icons-material";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";
import CameraListsModal from "./CameraListsModal";

const Appbar = () => {
  const { logout } = useLogout();

  const [isCameraListsModalOpen, setIsCameraListsModalOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            onClick={setIsCameraListsModalOpen}
            color="inherit"
            startIcon={<CameraAltSharp />}
            sx={{ border: "1px solid white" }}
          >
            Cameras
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
