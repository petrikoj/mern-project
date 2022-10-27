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
    getPlaylist();
  }, [_id]);

  return { playlist, comments, setComments, error, loading, getPlaylist };
};

// GET user by ID

const useFetchUser = (_id) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const {
    data: myUser,
    error,
    loading,
  } = useFetch(
    `http://localhost:5000/api/users/profile/${_id}`,
    requestOptions
  );
  return { myUser, error, loading };
};

export { useFetchPlaylists, useFetchPlaylistById, useFetchUser };
