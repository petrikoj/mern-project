import useFetch from "./useFetch.js";

const useGetAllPlaylists = () => {
  const {
    data: playlists,
    error,
    loading,
  } = useFetch(baseURL + "/api/playlists/all");
  console.log(playlists);
  return { playlists, error, loading };
};

export default useGetAllPlaylists;
