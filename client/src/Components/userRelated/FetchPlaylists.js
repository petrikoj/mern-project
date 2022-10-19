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

const useFetchPlaylistById = (_id) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const {
    data: playlist,
    error,
    loading,
  } = useFetch(`http://localhost:5000/api/playlists/${_id}`, requestOptions);
  return { playlist, error, loading };
};

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
