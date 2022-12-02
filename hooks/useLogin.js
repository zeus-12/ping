import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const SERVER_URL = "http://localhost:4000";

  const router = useRouter();
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${SERVER_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();

    if (!json.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json.data));
      dispatch({ type: "LOGIN", payload: json.data });
      setIsLoading(false);
      router.push("/");
    }
  };

  return { login, error };
};
