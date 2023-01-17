import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const useUpdateUser = () => {
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserProfile({
      ...userProfile,
      email: email.current.value,
      password: password.current.value,
      username: username.current.value,
    });
    console.log(newUser);
  };
  const updateUser = async () => {};
  return { handleSubmit, updateUser };
};
export default useUpdateUser;
