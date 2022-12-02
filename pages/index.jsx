import { useRouter } from "next/router";
import { useEffect } from "react";
import AppBar from "../components/AppBar";
import HomeLayout from "../components/HomeLayout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  // use

  if (user) {
    return (
      <div>
        <AppBar />
        <HomeLayout />
      </div>
    );
  } else {
    return <div className="text-red-400">loading...</div>;
  }
}
