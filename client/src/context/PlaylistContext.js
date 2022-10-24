import { useToast } from "@chakra-ui/react";
import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PlaylistContext = createContext();

export const PlaylistContextProvider = (props) => {
  const { userProfile } = useContext(AuthContext);

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
