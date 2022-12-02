import {Card, CardActionArea, CardActions, CardContent, Button, Typography, Divider, Box} from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';

const RequestCard = ({request, index, selectedRequestIndex, setSelectedRequestIndex}) => {
    const handleMarkerClick = () => {
        setSelectedRequestIndex(index);
    };

    return (
        <Card sx={{ border: selectedRequestIndex === index ? "2px solid" : "", borderColor: "primary.main", width: "100%"}}>
            <CardActionArea onClick={handleMarkerClick}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        <LocationIcon sx={{ mr: 1 }} color="error" /> {request.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {"29/09/2021 12:00:00"}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Divider />
            <CardActions>
            <Box sx={{ backgroundColor: "primary.main", color: "white", borderRadius: "5px", width: "100%", textAlign: "center" }}>
                <Button size="small" color="primary" variant="contained" fullWidth> Resolve </Button>
            </Box>
            </CardActions>
        </Card>
    );
}

export default RequestCard;