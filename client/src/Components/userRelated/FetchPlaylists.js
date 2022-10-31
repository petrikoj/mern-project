import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";

const useFetchPlaylists = () => {
  const {
    data: playlists,
    error,
    loading,
  } = useFetch(`http://localhost:5000/api/playlists/all`);
  console.log(playlists);
  return { playlists, error, loading };
};

// GET playlist by ID

const useFetchPlaylistById = (_id) => {
  const [playlist, setPlaylist] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPlaylist = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/playlists/${_id}`
      );
      const result = await response.json();
      setPlaylist(result);
      setComments(result.comments);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect in useFetchPlaylistById ran");
    getPlaylist();
  }, [_id]);

  return {
    playlist,
    setPlaylist,
    comments,
    setComments,
    error,
    loading,
    getPlaylist,
  };
};

// GET user by ID

const useFetchUser = (_id) => {
  const {
    data: myUser,
    error,
    loading,
  } = useFetch(`http://localhost:5000/api/users/profile/${_id}`);
  return { myUser, error, loading };
};

export { useFetchPlaylists, useFetchPlaylistById, useFetchUser };
