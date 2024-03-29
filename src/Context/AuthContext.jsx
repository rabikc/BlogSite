import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(
    localStorage.getItem("access")
      ? JSON.parse(localStorage.getItem("access"))
      : sessionStorage.getItem("access")
      ? JSON.parse(sessionStorage.getItem("access"))
      : null
  );

  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    localStorage.getItem("access") ? true : false
  );

  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const checkboxHandle = (e) => {
    setRememberMe(e.target.checked);
    console.log(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signin = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    console.log(signin);
    if (signin.ok === true) {
      const data = await signin.json();
      setUser(data.user);
      setToken(data.accessToken);
      localStorage.setItem("access", JSON.stringify(data.accessToken));
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(data);
      console.log(data.user);
      navigate("/");
    }
    // else if (signin.ok === true && rememberMe === false) {
    //   const data = await signin.json();
    //   setUser(data.user);
    //   setToken(data.accessToken);
    //   sessionStorage.setItem("access", JSON.stringify(data.accessToken));
    //   sessionStorage.setItem("user", JSON.stringify(data.user));
    //   console.log(data);
    //   console.log(data.user);
    //   navigate("/");
    // }
    else if (signin.status === 400) {
      setError("Your email or password is wrong");
      console.log(error);
    }
  };

  if (error) {
    setTimeout(() => {
      setError("");
    }, 4000);
  }

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  const values = {
    user,
    handleSubmit,
    error,
    setError,
    isLoggedIn,
    token,
    logout,
    checkboxHandle,
    rememberMe,
  };

  return (
    <AuthContext.Provider value={{ values }}>{children}</AuthContext.Provider>
  );
};
