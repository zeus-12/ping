import { AppBar, Toolbar, Typography , Button} from "@mui/material";
import { ExitToApp as LogoutIcon } from "@mui/icons-material";

const Appbar = ({appBarTitle, actionButtonText, actionButtonOnClick}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {appBarTitle}
                </Typography>
                <Button onClick={actionButtonOnClick} color="inherit" startIcon={<LogoutIcon />} sx={{border: "1px solid white"}}>{actionButtonText}</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar