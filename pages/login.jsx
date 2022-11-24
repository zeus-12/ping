import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import getServerSession from "../utils/getServerSession";

export default function SignIn() {
  const router = useRouter();
  const loginHandler = async () => {
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
      <div className="flex flex-col gap-2">
        <input
          placeholder="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="bg-[#0b5893] flex justify-between px-2"
        onClick={loginHandler}
      >
        <p className="pl-2">Sign in</p>
      </button>

      {error && <p className="text-red-400">{error}</p>}
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
