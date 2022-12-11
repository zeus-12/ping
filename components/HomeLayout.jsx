import {
  Grid,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tabs,
  Tab,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
// import * as requestData from "../data/requestsData.json";
// import * as cameraData from "../data/cameraData.json";
import RequestCard from "./RequestCard";
import CameraFeedModal from "./CameraFeedModal";
import { SERVER_URL } from "../utils/constants";

const MapWithNoSSR = dynamic(() => import("./HomeMap"), { ssr: false });

const HomeLayout = () => {
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(0);
  const [liveRequests, setLiveRequests] = useState([]);
  const [resolvedRequets, setResolvedRequests] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource(`${SERVER_URL}/connect`);

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (parsedData) {
          setLiveRequests((prevRequests) => {
            return [...prevRequests, parsedData];
          });
        }
      };

      setListening(true);
    }
    if (liveRequests.length === 1) {
      setCameras(liveRequests[0].nearestCameras);
    }
  }, [listening, liveRequests]);

  const handleCameraClick = (index) => {
    setSelectedCameraIndex(index);
    setOpen(true);
  };

  const handleRequestClick = (index) => {
    setSelectedRequestIndex(index);
    setSelectedCameraIndex(0);
    setCameras(liveRequests[index].nearestCameras);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      {cameras && (
        <CameraFeedModal
          open={open}
          setOpen={setOpen}
          cameraDetails={cameras[selectedCameraIndex]}
        />
      )}
      <Grid item xs={7}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ height: "88vh", border: "1px solid #d3d3d3" }}>
              <MapWithNoSSR
                requests={liveRequests}
                selectedRequestIndex={selectedRequestIndex}
                handleRequestClick={(index) => handleRequestClick(index)}
                cameras={cameras}
                selectedCameraIndex={selectedCameraIndex}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Paper sx={{ height: "88vh", border: "1px solid #d3d3d3" }}>
          <Box
            sx={{
              p: 0.3,
              backgroundColor: "#d3d3d3",
              textAlign: "center",
              borderRadius: "5px 5px 0px 0px",
              height: "6vh",
            }}
          >
            <Typography variant="h6"> Camera Feed </Typography>
          </Box>
          {cameras.length > 0  && 
          <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
              {cameras.map((camera, index) => (
                  <ListItem
                    key={camera.id}
                    disablePadding
                    sx={{ borderBottom: "1px solid #d3d3d3" }}
                  >
                    <ListItemButton onClick={() => handleCameraClick(index)}>
                      <ListItemText primary={camera.camera_name} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Box>}
          {cameras.length === 0 && 
          <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
              <Typography variant="body2" color="GrayText" align="center"> Select a request to view nearby cameras </Typography>
          </Box>}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper sx={{ height: "88vh", border: "1px solid #d3d3d3" }}>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth" centered sx={{ backgroundColor: "#d3d3d3", borderRadius: "5px 5px 0px 0px", height: "6vh" }}>
        <Tab label="Live Requests" />
        <Tab label="Resolved Requests" />
        </Tabs>
        {selectedTab === 0 && liveRequests && liveRequests.length === 0 && (
          <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Typography variant="body2" color="GrayText"> - No Live Requests - </Typography>
          </Box> )}
        {selectedTab === 1 && resolvedRequets && resolvedRequets.length === 0 && (
          <Box sx={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Typography variant="body2" color="GrayText"> - No resolved requests - </Typography>
          </Box> )}
        {selectedTab === 0 && liveRequests && liveRequests.length > 0 && (
        <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>
            <List>
              {liveRequests.map((request, index) => (
                  <ListItem key={request.id}>
                  <RequestCard
                      isResolvedPage={true}
                      setLiveRequests={setLiveRequests}
                      setResolvedRequests={setResolvedRequests}
                      key={request.id}
                      request={request}
                      index={index}
                      selectedRequestIndex={selectedRequestIndex}
                      handleRequestClick={(index) => handleRequestClick(index)}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>
        )}
        {selectedTab === 1 && resolvedRequets && resolvedRequets.length > 0 && (
        <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>
            <List>
              {resolvedRequets.map((request, index) => (
                  <ListItem key={request.id}>
                    <RequestCard
                      setLiveRequests={setLiveRequests}
                      setResolvedRequests={setResolvedRequests}
                      key={request.id}
                      request={request}
                      index={index}
                      selectedRequestIndex={selectedRequestIndex}
                      handleRequestClick={(index) => handleRequestClick(index)}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>
        )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HomeLayout;
