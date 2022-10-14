import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);

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
    redirect("/", { replace: true });
    console.log("User logged out successfully");
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          requestOptions
        );

        const result = await response.json();
        setUserProfile({
          _id: result._id,
          username: result.username,
          email: result.email,
          avatar: result.avatar,
        });
      } catch (error) {
        console.log("Error accessing user's profile", error);
      }
    } else {
      setError(true);
      console.log("No token for this user");
    }
  };

  /* const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer" + token);
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
      console.log(result);
      setUserProfile({
        username: result.username,
        email: result.email,
        avatar: result.avatar,
      });
    } catch (error) {
      console.log(error);
    }
  }; */

  useEffect(() => {
    checkUserStatus();
    console.log("useEffect ran");
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        checkUserStatus,
        getUserProfile,
        userProfile,
        logoutUser,
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
