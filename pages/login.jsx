import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import getServerSession from "../utils/getServerSession";
import Input from "../components/Input";
export default function SignIn() {
  const router = useRouter();
  const loginHandler = async () => {
    if (username.trim().length == 0 || password.trim().length === 0) {
      setError("Enter both Username & Password");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: `${window.location.origin}`,
    });
    if (res.status != 200) {
      setError("Incorrect credentials");

      setUsername("");
      setPassword("");
    } else {
      router.push("/");
    }
  };
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        <Button
          fullWidth
          variant="contained"
          className="px-2 bg-blue-500"
          onClick={loginHandler}
        >
          <p className="pl-2">Sign in</p>
        </Button>

        {<p className="text-red-400">{error}</p>}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
