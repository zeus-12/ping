import { TextField } from "@mui/material";

const Input = ({ type, value, setValue, label }) => {
  return (
    <TextField
      fullWidth
      required
      variant="standard"
      type={type}
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
export default Input;
