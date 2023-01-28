import { Button as MUIButton } from "@mui/material";

const Button = ({ children, fullWidth = false, onClick = () => {} }) => {
  return (
    <MUIButton
      fullWidth={fullWidth}
      variant="contained"
      style={{ padding: "0 0.5rem", backgroundColor: "#3B82F6" }}
      onClick={onClick}
    >
      {children}
    </MUIButton>
  );
};
export default Button;
