import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";
import { SERVER_URL } from "../utils/constants";
import { useAuthContext } from "../hooks/useAuthContext";

const CameraFeedModal = ({ open, setOpen, cameraDetails }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [startTiming, setStartTiming] = useState(null);

  const { user } = useAuthContext();

  const handleClose = () => {
    resetRecording();
    setOpen(false);
  };

  const resetRecording = () => {
    setIsRecording(false);
    setStartTiming(null);
  };

  const saveRecordingToDb = async () => {
    if (!startTiming) return;

    const response = await fetch(`${SERVER_URL}/api/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({
        camera_id: cameraDetails._id,
        start_time: startTiming,
        end_time: new Date(),
      }),
    });

    if (response.ok) {
      //todo show toast
    } else {
      // todo show toast
    }
  };

  const startRecordingHandler = () => {
    setStartTiming(new Date());
    setIsRecording(true);
  };

  const endRecordingHandler = async () => {
    if (!isRecording || !startTiming) return;

    await saveRecordingToDb();
    resetRecording();
  };

  const deleteRecordingHandler = () => {
    resetRecording();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6"> {cameraDetails?.camera_name} </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            width: "400px",
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6"> Camera Feed </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={startRecordingHandler}
          disabled={isRecording}
        >
          Start Recording
        </Button>
        <Button
          color="error"
          onClick={endRecordingHandler}
          disabled={!isRecording}
        >
          End Recording
        </Button>
        <Button
          color="error"
          disabled={!isRecording}
          onClick={deleteRecordingHandler}
        >
          Delete Recording
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CameraFeedModal;
