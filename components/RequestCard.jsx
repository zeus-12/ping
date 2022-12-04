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
  setRequests,
  setRecent,
  request,
  index,
  selectedRequestIndex,
  handleRequestClick,
}) => {
  const handleResolveBtnClick = () => {
    setRecent((prev) => [...prev, request].slice(-10));
    // todo add notification
    setRequests((prev) => prev.filter((item) => item.id !== request.id));
  };

  return (
    <Card
      sx={{
        border: selectedRequestIndex === index ? "2px solid" : "",
        borderColor: "primary.main",
        width: "100%",
      }}
    >
      <CardActionArea onClick={() => handleRequestClick(index)}>
        <CardContent>
          <h1 gutterBottom variant="h6" component="h6">
            <LocationIcon sx={{ mr: 1 }} color="error" /> {request.label}
          </h1>
          <Typography variant="body2" color="text.secondary">
            {request.createdAt}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: "5px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Button
            size="small"
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => handleResolveBtnClick(index)}
          >
            Resolve
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RequestCard;
