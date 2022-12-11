import Input from "../components/Input";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography, TextField } from "@mui/material";

import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";

export default function SignIn() {
  const { user } = useAuthContext();
  const router = useRouter();

  const { login, error } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    if (username.trim().length == 0 || password.trim().length === 0) {
      return;
    } else {
      setLoading(true);

      await login(username, password);
      setLoading(false);
    }
  };

  if (user) {
    router.push("/");
  } else {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "url('/images/login-background.jpg')", backgroundSize: "cover" }}>
        <Paper sx={{ width: "100%", maxWidth: 400, p: 2 }}>
          <Box>
            <Typography variant="h5" > Sign in </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField label="Username" value={username} variant="outlined" fullWidth={true} onChange={(e) => setUsername(e.target.value)} />
          <TextField label="Password" value={password} variant="outlined" fullWidth={true} onChange={(e) => setPassword(e.target.value)} type="password" />
            <LoadingButton
              variant="contained"
              fullWidth={true}
              onClick={loginHandler}
              loading={loading}
            >
              Sign in
            </LoadingButton>

            {error && <p style={{color:"#F87171"}}>{error}</p>}
          </Box>
        </Paper>
      </Box>
    );
  }
}
