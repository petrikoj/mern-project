import { useToast } from "@chakra-ui/react";
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/getServerUrl";
import getToken from "../utils/getToken";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.log(error);
      toast({
        title: `${error.message}`,
        status: "error",
        variant: "subtle",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  // GET userProfile

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          baseURL + "/api/users/profile/",
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
        return error;
      }
    }
  };

  // GET user by ID

  const getUserById = async (_id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          baseURL + `/api/users/profile/${_id}`,
          requestOptions
        );
        const myUser = await response.json();
        console.log("getUserById:", myUser);
        setUserProfile(myUser);
      } catch (error) {
        console.log("Error accessing user's profile", error);
      }
    } else {
      setError(true);
      console.log("No token for this user");
    }
  };

  //

  /* const checkUserLikes = () => {
    myPlaylists.map((list) => {
      const userLikes = list.liked_by;
      if (userLikes.includes(userProfile._id)) {
        setIsLikedByUser(true);
      } else {
        setIsLikedByUser(false);
      }
      return isLikedByUser;
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
        setUserProfile,
        getUserById,
        logoutUser,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
