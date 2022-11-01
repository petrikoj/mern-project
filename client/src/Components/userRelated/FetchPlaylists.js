import { useEffect, useState } from "react";
import { baseURL } from "../../utils/getServerUrl";
import useFetch from "../../hooks/useFetch.js";

const useFetchPlaylists = () => {
  const {
    data: playlists,
    error,
    loading,
  } = useFetch(baseURL + "/api/playlists/all");
  console.log(playlists);
  return { playlists, error, loading };
};

// GET playlist by ID

const useFetchPlaylistById = (_id) => {
  const [playlist, setPlaylist] = useState({});
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPlaylist = async () => {
    try {
      const response = await fetch(baseURL + `/api/playlists/${_id}`);
      const result = await response.json();
      setPlaylist(result);
      setComments(result.comments);
      setLikes(result.liked_by);
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
    likes,
    setLikes,
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
  } = useFetch(baseURL + `/api/users/profile/${_id}`);
  return { myUser, error, loading };
};

export { useFetchPlaylists, useFetchPlaylistById, useFetchUser };
