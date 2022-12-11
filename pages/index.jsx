import { useRouter } from "next/router";
import { useEffect } from "react";
import AppBar from "../components/AppBar";
import HomeLayout from "../components/HomeLayout";
import { useAuthContext } from "../hooks/useAuthContext";
import { CircularProgress, CssBaseline } from "@mui/material";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  // use

  if (user) {
    return (
      <div>
        <CssBaseline />
        <AppBar />
        <HomeLayout />
      </div>
    );
  } else {
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}} >
          <CircularProgress />
      </div>
    );
  }
}
