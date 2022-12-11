import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";

const RequestCard = ({
  setLiveRequests,
  setResolvedRequests,
  request,
  index,
  selectedRequestIndex,
  handleRequestClick,
  isResolvedPage=false
}) => {
  const handleResolveBtnClick = () => {
    if (!isResolvedPage) {
      setResolvedRequests((prev) => prev.filter((item) => item.id !== request.id));
      setLiveRequests((prev) => [...prev, request]);
      return;
      
    } else {
      
      setResolvedRequests((prev) => [...prev, request].slice(-10));
      // todo add notification
      setLiveRequests((prev) => prev.filter((item) => item.id !== request.id));
    }
  };

  return (
    <Card
      sx={{
        border: selectedRequestIndex === index ? "2px solid" : "",
        borderColor: "primary.main",
        width: "100%",
      }}
    >
      <CardActionArea onClick={!isResolvedPage ? ()=>{}:() => handleRequestClick(index)}>
        <CardContent>
          <h3 gutterBottom variant="h3" component="h3">
            <LocationIcon sx={{ mr: 1 }} color="error" /> {request.label}
          </h3>
          <Typography variant="body2" color="text.secondary">
            {request.createdAt}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => handleResolveBtnClick(index)}
          >
          {!isResolvedPage? "Undo":"Resolve"}
          </Button>
      </CardActions>
    </Card>
  );
};

export default RequestCard;
