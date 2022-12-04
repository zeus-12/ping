import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { SERVER_URL } from "../utils/constants";
import { Close as CloseIcon } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CameraListModal = ({ open, closeModal }) => {
  const { user } = useAuthContext();
  const [cameras, setCameras] = useState([]);
  const [pageno, setPageno] = useState(1);
  const fetchAllCameras = async () => {
    // todo implement pagination
    // lets show 20 cameras per page
    const res = await fetch(`${SERVER_URL}/api/camera?page=${pageno}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    });

    const data = await res.json();
    console.log(data.data);
    setCameras(data.data);
  };
  useEffect(() => {
    if (open) {
      fetchAllCameras();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth={"md"}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Cameras</Typography>
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {cameras.length != 0 ? (
          cameras.map((camera) => (
            <div
              key={camera.id}
              className="py-2 border-black border-y-[0.0005px]"
            >
              <div className="flex justify-between">
                <p className="font-semibold">{camera.camera_name}</p>
                {!camera.isWorking ? (
                  <CheckIcon titleAccess="Working" className="text-green-500" />
                ) : (
                  <ErrorOutlineIcon
                    titleAccess="Not Working"
                    className="text-red-500"
                  />
                )}
              </div>
              <p>{camera.building_name}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}

        {/* todo */}
        {/* add pagination here */}
      </DialogContent>
    </Dialog>
  );
};
export default CameraListModal;
