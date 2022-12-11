import {Grid, Box, Button, TextField, Switch, FormControlLabel} from '@mui/material';
import {useState, useEffect} from 'react';

const AddCamera = ({cameraDetails, onSaveBtnClick, onCancelBtnClick}) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [cameraName, setCameraName] = useState('');
    const [streamUrl, setStreamUrl] = useState('');
    const [buildingName, setBuildingName] = useState('');
    const [isWorking, setIsWorking] = useState(true);

    useEffect(() => {
        if (cameraDetails) {
            setLatitude(cameraDetails.location.coordinates[1]);
            setLongitude(cameraDetails.location.coordinates[0]);
            setCameraName(cameraDetails.camera_name);
            setStreamUrl(cameraDetails.stream_url);
            setBuildingName(cameraDetails.building_name);
            setIsWorking(cameraDetails.isWorking);
        }
    }, [cameraDetails]);

    const handleSaveBtnClick = () => {
        onSaveBtnClick({
            location: {
                type: 'Point',
                coordinates: [longitude, latitude],
            },
            camera_name: cameraName,
            stream_url: streamUrl,
            building_name: buildingName,
            isWorking,
        });
    }

    return (
        <Grid container spacing={2} sx={{p: 1, mt: 1}}>
            <Grid item xs={6}>
                <TextField label="Camera Name" fullWidth value={cameraName} onChange={(e) => setCameraName(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <TextField label="Building Name" fullWidth value={buildingName} onChange={(e) => setBuildingName(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <TextField label="Latitude" fullWidth value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <TextField label="Longitude" fullWidth value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Stream URL" fullWidth value={streamUrl} onChange={(e) => setStreamUrl(e.target.value)} />
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <FormControlLabel 
                control={<Switch checked={isWorking} onChange={(e) => setIsWorking(e.target.checked)} />}
                label={isWorking ? 'Working' : 'Not Working'}
            />
                <Box>
                    <Button variant="contained" onClick={handleSaveBtnClick} sx={{mr:1}}>Save</Button>
                    <Button variant="outlined" onClick={onCancelBtnClick}>Cancel</Button>
                </Box>
            </Grid>
        </Grid>
    );
}

export default AddCamera;



