import { useToast } from "@chakra-ui/react";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/getServerUrl";
import { AuthContext } from "./AuthContext";

export const PlaylistContext = createContext();

export const PlaylistContextProvider = (props) => {
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const redirect = useNavigate();
  const toast = useToast();

  // GET all Playlist

  const getAllPlaylists = async () => {
    try {
      const response = await fetch(baseURL + "/api/playlists/all");
      const result = await response.json();
      setMyPlaylists(result);
      setLoading(false);
      console.log("Fetch result from PlaylistContext", result);
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error);
    }
  };

  // GET Playlist by ID

  const getPlaylistById = async (_id) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    try {
      const response = await fetch(
        baseURL + `/api/playlists/${_id}`,
        requestOptions
      );
      const result = response.json();
      setLoading(false);
      setMyPlaylists(result);
    } catch (error) {
      console.log(error);
    }
    return { myPlaylists, error, loading };
  };

  // DELETE playlist

  const deletePlaylist = async ({ currentTarget }) => {
    const token = localStorage.getItem("token");
    const playlistToBeDeletedId = currentTarget.value;
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("_id", playlistToBeDeletedId);
      urlencoded.append("creator", userProfile._id);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          baseURL + "/api/playlists/:id/delete-playlist",
          requestOptions
        );
        const result = await response.json();
        console.log(result);
        toast({
          title: `${result.message}`,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        setMyPlaylists(
          myPlaylists.filter((list) => list._id !== playlistToBeDeletedId)
        );
        setUserProfile(result.userUpdated);
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    } else {
      alert("No token for this user");
    }
  };

  // Like + Unlike a Playlist (PUSH and PULL)

  // PUSH like to db

  const likePlaylist = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("user_id", userProfile._id);
    urlencoded.append("playlist_id", myPlaylists._id);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(baseURL + "/api/users/like", requestOptions);
      const result = await response.json();
      console.log(result);
      setIsLiked(true);
      toast({
        title: `${result.message}`,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      console.log(error);
    }
  };

  // PULL like from db

  const unlikePlaylist = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("user_id", userProfile._id);
    urlencoded.append("playlist_id", myPlaylists._id);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        baseURL + "/api/users/unlike",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setIsLiked(false);
      toast({
        title: `${result.message}`,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlaylists();
    console.log("useEffect ran in PlaylistContext");
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        getAllPlaylists,
        getPlaylistById,
        deletePlaylist,
        myPlaylists,
        setMyPlaylists,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
};
