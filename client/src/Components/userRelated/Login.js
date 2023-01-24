import { React, useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import {
  Button,
  FormControl,
  FormHelperText,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { isValidEmail, isValidPassword } from "../../utils/validators.js";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";
import { baseURL } from "../../utils/getServerUrl.js";

function Login() {
  const { checkUserStatus, loading, setLoading } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const redirect = useNavigate();
  const toast = useToast();

  const resetCredentialsError = () => {
    setCredentialsError(false);
  };

  // Checking the input values and pass them to callback login function

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Some error handling //
    if (
      !isValidEmail(email.current.value) &&
      !isValidPassword(password.current.value)
    ) {
      setEmailError(true);
      setPasswordError(true);
      setLoading(false);
    }
    if (
      !isValidEmail(email.current.value) &&
      isValidPassword(password.current.value)
    ) {
      setEmailError(true);
      setPasswordError(false);
      setLoading(false);
    }
    if (
      !isValidPassword(email.current.value) &&
      isValidEmail(email.current.value)
    ) {
      setPasswordError(true);
      setEmailError(false);
      setLoading(false);
    }
    // Handling valid input data //
    if (
      isValidEmail(email.current.value) &&
      isValidPassword(password.current.value)
    ) {
      setEmailError(false);
      setPasswordError(false);
      try {
        await handleLogin();
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    }
  };

  // Handling login POST request //

  const handleLogin = async () => {
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
      setLoading(true);
      const result = await response.json();
      if (response.status === 401) {
        setLoading(false);
        setCredentialsError(true);
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
        setCredentialsError(false);
        setLoading(false);
        redirect(`/`);
      }
    } catch (error) {
      setLoading(false);
      console.log("Login error", error);
    }
  };

  return (
    <VStack spacing="4">
      <FormControl isInvalid={emailError}>
        <VStack>
          <InputGroup>
            <InputLeftElement>
              <Icon as={FiMail} />
            </InputLeftElement>

            <Input
              variant="custom"
              type="text"
              placeholder="E-Mail"
              ref={email}
              sx={{ borderColor: credentialsError ? "red.400" : null }}
              onFocus={resetCredentialsError}
            />
          </InputGroup>
          {emailError ? (
            <FormHelperText color="red.300">
              Invalid email address
            </FormHelperText>
          ) : null}
        </VStack>
      </FormControl>

      <FormControl isInvalid={passwordError}>
        <VStack>
          <InputGroup>
            <InputLeftElement>
              <Icon as={MdOutlinePassword} />
            </InputLeftElement>
            <Input
              variant="custom"
              placeholder="Password"
              type="password"
              ref={password}
              sx={{ borderColor: credentialsError ? "red.400" : null }}
              onFocus={resetCredentialsError}
            />
          </InputGroup>
          {passwordError ? (
            <FormHelperText color="red.300">Invalid password</FormHelperText>
          ) : null}
        </VStack>
      </FormControl>
      <Button
        w={["80", "24"]}
        isLoading={loading ? true : false}
        isDisabled={loading ? true : false}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
