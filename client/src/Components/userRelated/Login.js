import { React, useState, useEffect, useContext, useRef } from "react";
import {
  Button,
  FormControl,
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
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const email = useRef();
  const password = useRef();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [credentialsError, setCredentialsError] = useState(null);
  const redirect = useNavigate();
  const toast = useToast();

  /*   const handleChangeHandler = (event) => {
    setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
  }; */

  //

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Error handling
    if (
      !isValidEmail(email.current.value) &&
      !isValidPassword(password.current.value)
    ) {
      setEmailError(true);
      setPasswordError(true);
    }
    if (
      !isValidEmail(email.current.value) &&
      isValidPassword(password.current.value)
    ) {
      setEmailError(true);
      setPasswordError(false);
    }
    if (
      !isValidPassword(email.current.value) &&
      isValidEmail(email.current.value)
    ) {
      setPasswordError(true);
      setEmailError(false);
    }
    // Handling valid input data
    if (
      isValidEmail(email.current.value) &&
      isValidPassword(password.current.value)
    ) {
      setEmailError(false);
      setPasswordError(false);
      /* setUserLogin((prev) => {
      return {
        ...prev,
        email: email.current.value,
        password: password.current.value,
      };
    }); */
      //console.log(userLogin);
      try {
        await handleLogin();
      } catch (error) {
        console.log(error);
      }
    } /* else {
      setEmailError(true);
      setPasswordError(true);
    } */
  };

  //

  const handleLogin = async () => {
    //console.log(userLogin);
    /* if (
      !isValidEmail(userLogin.email) &&
      !isValidPassword(userLogin.password)
    ) {
      alert(credentialsError);
      return;
    }
    if (!isValidEmail(userLogin.password)) {
      alert(emailError);
      return;
    }
    if (!isValidPassword(userLogin.password)) {
      alert(passwordError);
      return;
    }
    if (isValidEmail(userLogin.email) && isValidPassword(userLogin.password)) {
      setUserLogin({
        email: userLogin.email,
        password: userLogin.password,
      });
    } */

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email.current.value);
    urlencoded.append("password", password.current.value);

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
      if (response.status === 401) {
        setEmailError(true);
        setPasswordError(true);
        toast({
          title: `${result.message}`,
          status: "error",
          variant: "subtle",
          duration: 2000,
          isClosable: true,
        });
      }
      console.log("Result:", result);
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
    } catch (error) {
      console.log("Login error", error);
    }
  };

  /*   useEffect(() => {
    setCredentialsError("Wrong credentials");
    setEmailError("Wrong E-Mail");
    setPasswordError("Wrong Password");
  }, [credentialsError, emailError, passwordError]); */

  return (
    <VStack>
      <FormControl isInvalid={emailError}>
        <InputGroup>
          <InputLeftElement>
            <Icon as={FiMail} />
          </InputLeftElement>
          <Input
            variant="custom"
            type="text"
            placeholder="E-Mail"
            //name="email"
            //id="email"
            //value={userLogin.email ? userLogin.email : ""}
            //onChange={handleChangeHandler}
            ref={email}
          />
        </InputGroup>
      </FormControl>
      <FormControl isInvalid={passwordError}>
        <InputGroup>
          <InputLeftElement>
            <Icon as={MdOutlinePassword} />
          </InputLeftElement>
          <Input
            variant="custom"
            placeholder="Password"
            type="password"
            /* name="password"
          id="password"
          value={userLogin.password ? userLogin.password : ""}
          onChange={handleChangeHandler} */
            ref={password}
          />
        </InputGroup>
      </FormControl>

      <Button w={["80", "24"]} onClick={handleSubmit}>
        Login
      </Button>
    </VStack>
  );
}

export default Login;
