const checkForToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  if (!token) {
    return false;
  }
};

export default checkForToken;
