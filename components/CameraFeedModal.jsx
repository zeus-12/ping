import { useReactMediaRecorder } from "react-media-recorder";
import { Close as CloseIcon } from "@mui/icons-material";
import { useRef, useState } from "react";
import { SERVER_URL } from "../utils/constants";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

const CameraFeedModal = ({ open, setOpen, cameraDetails }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [startTiming, setStartTiming] = useState(null);

  const { user } = useAuthContext();
  const liveStreamRef = useRef(null);
  const canvasElt = document.getElementById("liveFeed");

  const stream = canvasElt?.captureStream(25); // 25 FPS

  const {
    status,
    startRecording: startVideoRecording,
    stopRecording: stopVideoRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    // customMediaStream: stream,
    screen: true,
    audio: false,
  });

  console.log(mediaBlobUrl);

  const handleClose = () => {
    resetRecording();
    setOpen(false);
  };

  const resetRecording = () => {
    setIsRecording(false);
    clearBlobUrl();
    setStartTiming(null);
  };

  const saveRecordingToDb = async () => {
    if (!startTiming) return;

    // upload mediaBlobUrl to azure blob storage
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
        video_url: "azureblobstorageurl",
      }),
    });

    if (response.ok) {
      //todo show toast
    } else {
      // todo show toast
    }
  };

  const startRecordingHandler = () => {
    startVideoRecording();
    setStartTiming(new Date());
    setIsRecording(true);
  };

  const endRecordingHandler = async () => {
    if (!isRecording || !startTiming) return;
    stopVideoRecording();

    await saveRecordingToDb();
    resetRecording();
  };

  const deleteRecordingHandler = () => {
    resetRecording();
    clearBlobUrl();
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
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6"> Camera Feed </Typography>
          <div className="mx-auto">
            <iframe
              id="liveFeed"
              width="420"
              height="315"
              ref={liveStreamRef}
              src={
                cameraDetails?.stream_url ||
                "https://www.youtube.com/embed/0gNauGdOkro"
              }
              allowFullScreen
              muted={true}
            />
          </div>
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
