import { useToast } from "@chakra-ui/react";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PlaylistContext = createContext();

export const PlaylistContextProvider = (props) => {
  const { userProfile } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  const [myPlaylists, setMyPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toast = useToast();

  // GET all Playlist

  const getAllPlaylists = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/playlists/all`);
      const result = await response.json();
      setMyPlaylists(result);
      setLoading(false);
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
        `http://localhost:5000/api/playlists/${_id}`,
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
      const response = await fetch(
        "http://localhost:5000/api/users/like",
        requestOptions
      );
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
        "http://localhost:5000/api/users/unlike",
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

  // useEffect for keeping the state of my playlists

  useEffect(() => {
    getAllPlaylists();
    console.log("useEffect ran in PlaylistContext");
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        getAllPlaylists,
        getPlaylistById,
        myPlaylists,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
};
