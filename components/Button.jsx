import { Button as MUIButton } from "@mui/material";

const Button = ({ children, fullWidth = false, onClick = () => {} }) => {
  return (
    <MUIButton
      fullWidth={fullWidth}
      variant="contained"
      className="px-2 bg-blue-500"
      onClick={onClick}
    >
      {children}
    </MUIButton>
  );
};
export default Button;
