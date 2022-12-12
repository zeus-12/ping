import {
    Grid,
    Paper,
    Box
} from "@mui/material";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/constants";
import CamerasTable from "./CamerasTable";
import AddCamera from "./AddCamera";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";


const MapWithNoSSR = dynamic(() => import("./ConfigMap"), { ssr: false });

const ConfigLayout = () => {
    const { user } = useAuthContext();
    const [cameras, setCameras] = useState([]);
    const [selectedCameraIndex, setSelectedCameraIndex] = useState(null);
    const [filterOptions, setFilterOptions] = useState(["All"]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!user) return
        // ${SERVER_URL}/api/camera?page=${pageno}
        axios.get(`${SERVER_URL}/api/camera/`, { 
            headers: { 
                "Content-Type": "application/json",
                "x-access-token": user?.token
        }}).then((res) => {
            setCameras(res.data.data);
            setFilterOptions((prevOptions) => {
                const newOptions = [...prevOptions];
                cameras.forEach((camera) => {
                    if (!newOptions.includes(camera.building_name)) {
                        newOptions.push(camera.building_name);
                    }
                });
                return newOptions;
            });
        });
    }, [user]);

    const handleEditBtnClick = (index) => {
        setIsEditing(true);
    };

    const handleAddBtnClick = () => {
        setSelectedCameraIndex(null);
        setIsEditing(true);
    };

    const handleDeleteBtnClick = (index) => {
        const newCameras = [...cameras];
        newCameras.splice(index, 1);
        setCameras(newCameras);
    };

    const handleAddNewCamera = (newCamera) => {
        axios.post(`${SERVER_URL}/api/camera/`, newCamera, { 
            headers: { 
                "Content-Type": "application/json",
                "x-access-token": user.token
        }}).then((res) => {
            setCameras((prevCameras) => {
                return [...prevCameras, res.data];
            });
        });
    };

    const handleUpdateCamera = (updatedCamera) => {
        axios.put(`${SERVER_URL}/api/camera/${cameras[selectedCameraIndex].id}`, updatedCamera, { 
            headers: { 
                "Content-Type": "application/json",
                "x-access-token": user.token
        }}).then((res) => {
            setCameras((prevCameras) => {
                const newCameras = [...prevCameras];
                newCameras[selectedCameraIndex] = res.data;
                return newCameras;
            });
        });
    };

    const handleCameraSelect = (index) => {
        setSelectedCameraIndex(index);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12} md={8}>
                <Paper sx={{height: "88vh", border: "1px solid #d3d3d3"}}>
                    <CamerasTable
                        rows={cameras}
                        onAddBtnClick={handleAddBtnClick}
                        onEditBtnClick={(index) => handleEditBtnClick(index)}
                        onDeleteBtnClick={(index) => handleDeleteBtnClick(index)}
                        selected={selectedCameraIndex}
                        onSelect={(index) => handleCameraSelect(index)}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper sx={{ height: "43vh", border: "1px solid #d3d3d3" }}>
                            <MapWithNoSSR lat={selectedCameraIndex ? cameras[selectedCameraIndex].location.coordinates[1] : null}
                            lng={selectedCameraIndex ? cameras[selectedCameraIndex].location.coordinates[0] : null}
                            selected={selectedCameraIndex}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ height: "43vh", border: "1px solid #d3d3d3" }}>
                        {isEditing ? ( <AddCamera 
                            onSaveBtnClick={selectedCameraIndex !== null ? handleUpdateCamera : handleAddNewCamera}
                            onCancelBtnClick={handleCancel} 
                            cameraDetails={selectedCameraIndex !== null ? cameras[selectedCameraIndex] : null} /> ) : ( 
                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                                <h3> Stream of {selectedCameraIndex !== null ? cameras[selectedCameraIndex].camera_name : "camera"} </h3>
                            </Box> )}
                        </Paper>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    );
};

export default ConfigLayout;

