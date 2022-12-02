import {Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const CameraFeedModal = ({open, setOpen, cameraDetails}) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleRecordBtnClick = () => {
        console.log("Record button clicked");
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6"> {cameraDetails?.cameraName} </Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ width: "60vw", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h6"> Camera Feed </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleRecordBtnClick}> Record </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CameraFeedModal;