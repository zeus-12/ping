import Input from "../components/Input";
import Button from "../components/Button";
import { LoadingButton } from "@mui/lab";

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
      <div className="min-h-screen gap-2 flex-col flex flex-1 justify-center items-center">
        <div className="bg-gray-100 p-32 rounded-xl space-y-4">
          <p className="text-4xl font-semibold tracking-tight">Login</p>
          <Input
            setValue={setUsername}
            value={username}
            label="Username"
            type="text"
          />
          <Input
            setValue={setPassword}
            value={password}
            label="Password"
            type="password"
          />

          <LoadingButton
            variant="outlined"
            fullWidth={true}
            onClick={loginHandler}
            loading={loading}
            className="px-2 bg-blue-500 text-white hover:bg-blue-400"
          >
            Sign in
          </LoadingButton>

          {error && <p className="text-red-400">{error}</p>}
        </div>
      </div>
    );
  }
}
