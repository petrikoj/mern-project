import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { baseURL } from "../utils/getServerUrl.js";

const useGuestLogin = () => {
  const { checkUserStatus } = useContext(AuthContext);
  const redirect = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", "guest@guest.com");
    urlencoded.append("password", "123456");

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        baseURL + "/api/users/login",
        requestOptions
      );
      const result = await response.json();
      const token = result.token;
      if (token) {
        localStorage.setItem("token", token);
        checkUserStatus();
        toast({
          title: "Login successful",
          status: "success",
          variant: "subtle",
          duration: 1500,
          isClosable: true,
        });
        redirect(`/`);
      }
      console.log("Result:", result);
    } catch (error) {
      console.log("Login error", error);
    }
  };
  return { handleLogin };
};

export default useGuestLogin;
