"use client";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    window.localStorage.getItem("authTokens")
      ? jwt_decode(window.localStorage.getItem("authTokens"))
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    window.localStorage.getItem("authTokens")
      ? JSON.parse(window.localStorage.getItem("authTokens"))
      : null
  );

  let [loading, setLoading] = useState(true);

  const router = useRouter();

  let loginUser = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:5167/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });
      var data = await response.json();
      if (response.status === 200 && typeof window !== "undefined") {
        setAuthTokens(data.data);
        setUser(jwt_decode(data.data.accessToken));
        window.localStorage.setItem("authTokens", JSON.stringify(data.data));
        router.push("/");
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    window.localStorage.removeItem("authTokens");
    router.push("/");
  };

  

  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.accessToken));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
