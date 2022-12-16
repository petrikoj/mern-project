import { React, useState, useEffect, useContext } from "react";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { isValidEmail, isValidPassword } from "../../utils/validators.js";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";
import { baseURL } from "../../utils/getServerUrl.js";

function Login() {
  const { checkUserStatus } = useContext(AuthContext);
  const [userLogin, setUserLogin] = useState({});
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [credentialsError, setCredentialsError] = useState(null);

  const redirect = useNavigate();

  const toast = useToast();

  const handleChangeHandler = (event) => {
    setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    if (
      !isValidEmail(userLogin.email) &&
      !isValidPassword(userLogin.password)
    ) {
      alert(credentialsError);
      return;
    }
    if (!isValidEmail(userLogin.email)) {
      alert(emailError);
      return;
    }
    if (!isValidPassword(userLogin.password)) {
      alert(passwordError);
      return;
    }

    if (isValidEmail(userLogin.email) && isValidPassword(userLogin.password)) {
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", userLogin.email);
      urlencoded.append("password", userLogin.password);

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
          toast({
            title: "Login successful",
            status: "success",
            variant: "subtle",
            duration: 1500,
            isClosable: true,
          });
          redirect(`/`);
          checkUserStatus();
        }
        console.log("Result:", result);
      } catch (error) {
        console.log("Login error", error);
      }
    }
  };

  useEffect(() => {
    setCredentialsError("Wrong credentials");
    setEmailError("Wrong E-Mail");
    setPasswordError("Wrong Password");
  }, [credentialsError, emailError, passwordError]);

  return (
    <VStack>
      <InputGroup>
        <InputLeftElement>
          <Icon as={FiMail} />
        </InputLeftElement>
        <Input
          variant="custom"
          type="text"
          name="email"
          id="email"
          placeholder="E-Mail"
          value={userLogin.email ? userLogin.email : ""}
          onChange={handleChangeHandler}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement>
          <Icon as={MdOutlinePassword} />
        </InputLeftElement>
        <Input
          variant="custom"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={userLogin.password ? userLogin.password : ""}
          onChange={handleChangeHandler}
        />
      </InputGroup>

      <Button w={["80", "24"]} onClick={handleLogin}>
        Login
      </Button>
    </VStack>
  );
}

export default Login;
