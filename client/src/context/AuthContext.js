import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const redirect = useNavigate();

  const checkUserStatus = () => {
    const token = getToken();
    if (token) {
      setUser(true);
      console.log("User logged in");
    }
    if (!token) {
      setUser(false);
      console.log("User NOT logged in");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    checkUserStatus();
    redirect("/");
    console.log("User logged out successfully");
  };

  const getUser = async (token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/users/profile",
        requestOptions
      );
      const result = await response.json();
      setUser({
        _id: result._id,
        username: result.username,
        email: result.email,
        avatar: result.avatar,
      });
      console.log("User from AuthContext:", user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserStatus();
    console.log("useEffect ran");
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ checkUserStatus, logoutUser, getUser, user, setUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
