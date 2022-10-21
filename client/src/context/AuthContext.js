import { useToast } from "@chakra-ui/react";
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import getToken from "../utils/getToken";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);

  const toast = useToast();

  const redirect = useNavigate();

  //

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

  //

  const logoutUser = () => {
    try {
      localStorage.removeItem("token");
      checkUserStatus();
      redirect("/", { replace: true });
      toast({
        title: "Logout successful",
        status: "success",
        variant: "subtle",
        duration: 1500,
        isClosable: true,
      });
      console.log("User logged out successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //

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
          "http://localhost:5000/api/users/profile/",
          requestOptions
        );

        const result = await response.json();
        console.log("getUserProfile:", result);
        setUserProfile({
          _id: result._id,
          username: result.username,
          email: result.email,
          avatar: result.avatar,
          playlists: result.playlists,
          liked: result.liked,
        });
      } catch (error) {
        console.log("Error accessing user's profile", error);
      }
    } else {
      setError(true);
      console.log("No token for this user");
    }
  };

  //
  /* const getUserById = async (_id) => {
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
          `http://localhost:5000/api/users/profile/${_id}`,
          requestOptions
        );

        const myUser = await response.json();
        console.log("getUserProfile:", myUser);
        setUserProfile(myUser);
      } catch (error) {
        console.log("Error accessing user's profile", error);
      }
    } else {
      setError(true);
      console.log("No token for this user");
    }
  }; */

  //

  /* const HasUserLikedPlaylist = () => {
    const result = useFetchPlaylists();
    const playlists = result.playlists;
    playlists.forEach((playlist) => {
      playlist.liked_by.forEach((like) => {
        if (like === userProfile._id) {
          return true;
        } else {
          return false;
        }
      });
    });
  }; */

  //

  useEffect(() => {
    checkUserStatus();
    console.log("useEffect ran in AuthContext");
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
