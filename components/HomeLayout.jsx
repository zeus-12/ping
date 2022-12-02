import {Grid, Paper, Box, Typography, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import dynamic from 'next/dynamic';
import {useState, useEffect} from 'react';
import * as requestData from "../data/requestsData.json";
import * as cameraData from "../data/cameraData.json";
import RequestCard from './RequestCard';
import CameraFeedModal from './CameraFeedModal';

const MapWithNoSSR = dynamic(() => import('./Map'), { ssr: false});

const HomeLayout = () => {
    const [selectedRequestIndex, setSelectedRequestIndex] = useState(0);
    const [requests, setRequests] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setRequests(requestData.default);
        setCameras(cameraData.default);
    }, []);

    const handleCameraClick = (index) => {
        setSelectedCameraIndex(index);
        setOpen(true);
    };
    
    return (
        <Grid container spacing={2} sx={{p: 1}}>
            {cameras && <CameraFeedModal open={open} setOpen={setOpen} cameraDetails={cameras[selectedCameraIndex]} />}
            <Grid item xs={7}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper sx={{ height: "88vh", border: "1px solid #d3d3d3" }}>
                            <MapWithNoSSR requests={requests} selectedRequestIndex={selectedRequestIndex} setSelectedRequestIndex={setSelectedRequestIndex}
                                cameras={cameras} selectedCameraIndex={selectedCameraIndex} setSelectedCameraIndex={setSelectedCameraIndex} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Paper sx={{ height: "88vh", border: "1px solid #d3d3d3" }}>
                    <Box sx={{ p: 0.3, backgroundColor: "#d3d3d3", textAlign: "center", borderRadius: "5px 5px 0px 0px" }}>
                        <Typography variant="h6"> Camera Feed </Typography>
                    </Box>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {cameras && cameras.map((camera, index) => (
                            <ListItem key={index} disablePadding sx={{borderBottom: "1px solid #d3d3d3"}}> 
                                <ListItemButton onClick={() => handleCameraClick(index)}>
                                    <ListItemText primary={camera.cameraName} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper sx={{ height: "88vh", border: "1px solid #d3d3d3" }}>
                    <Box sx={{ p: 0.3, backgroundColor: "#d3d3d3", textAlign: "center", borderRadius: "5px 5px 0px 0px" }}>
                        <Typography variant="h6"> Requests </Typography>
                    </Box>
                    <Box sx={{ maxHeight: '80vh', overflow: 'auto' }}>
                        <List>
                            {requests && requests.map((request, index) => (
                                <ListItem key={request.id}>
                                    <RequestCard key={request.id} request={request} index={index} selectedRequestIndex={selectedRequestIndex} setSelectedRequestIndex={setSelectedRequestIndex} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default HomeLayout;

