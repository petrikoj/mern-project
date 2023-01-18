const useGetMeToken = () => {
  const getMyToken = () => {
    try {
      const myToken = localStorage.getItem("token");
      if (myToken) {
        return myToken;
      }
    } catch (error) {
      return error;
    }
  };
  return { getMyToken };
};

export default useGetMeToken;
