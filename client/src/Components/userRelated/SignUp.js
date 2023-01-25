import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { RiUploadCloud2Line } from "react-icons/ri";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utils/validators";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/getServerUrl.js";

function SignUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isInput, setIsInput] = useState(true);
  const redirect = useNavigate();
  const toast = useToast();

  /*  const email = useRef();
  const password = useRef();
  const username = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    setNewUser({
      ...newUser,
      email: email.current.value,
      password: password.current.value,
      username: username.current.value,
    });
    console.log(newUser);
  }; */

  const handleChangeHandler = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const attachFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsImg(true);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log("selectedFile:", selectedFile);
    console.log("formData:", formData);
    if (!selectedFile || selectedFile === "") {
      setImgError(true);
    } else {
      setImgError(false);
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      try {
        setImgLoading(true);
        const response = await fetch(
          baseURL + "/api/users/image-upload",
          requestOptions
        );
        const result = await response.json();
        console.log("Result:", result);
        setNewUser({ ...newUser, avatar: result.avatar });
        setImgLoading(false);
      } catch (error) {
        setImgLoading(false);
        console.log(error);
      }
    }
  };

  const registerNewUser = async () => {
    setSubmitLoading(true);
    // Error handling //
    /* if (
      !isValidUsername(newUser.username) &&
      !isValidEmail(newUser.email) &&
      !isValidPassword(newUser.password) &&
      !selectedFile
    ) {
      setSubmitLoading(false);
      setUsernameError(true);
      setEmailError(true);
      setPasswordError(true);
      setImgError(true);
    }
    if (
      isValidUsername(newUser.username) &&
      !isValidEmail(newUser.email) &&
      !isValidPassword(newUser.password) &&
      !selectedFile
    ) {
      setSubmitLoading(false);
      setUsernameError(false);
      setEmailError(true);
      setPasswordError(true);
      setImgError(true);
    }
    if (
      isValidUsername(newUser.username) &&
      isValidPassword(newUser.password) &&
      !isValidEmail(newUser.email) &&
      !selectedFile
    ) {
      setSubmitLoading(false);
      setUsernameError(false);
      setPasswordError(false);
      setEmailError(true);
      setImgError(true);
    }
    if (
      isValidUsername(newUser.username) &&
      isValidEmail(newUser.email) &&
      !isValidPassword(newUser.password) &&
      !selectedFile
    ) {
      setSubmitLoading(false);
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(true);
      setImgError(true);
    }
    if (
      isValidPassword(newUser.password) &&
      !isValidUsername(newUser.username) &&
      !isValidEmail(newUser.email) &&
      !selectedFile
    ) {
      setSubmitLoading(false);
      setPasswordError(false);
      setUsernameError(true);
      setEmailError(true);
      setImgError(true);
    }
    if (
      isValidUsername(newUser.username) &&
      isValidPassword(newUser.password) &&
      !isValidEmail(newUser.email) &&
      !selectedFile
    ) {
      setSubmitLoading(false);
      setPasswordError(false);
      setUsernameError(false);
      setEmailError(true);
      setImgError(true);
    }
    if (
      isValidUsername(newUser.username) &&
      isValidEmail(newUser.email) &&
      isValidPassword(newUser.password) &&
      !selectedFile
    ) {
      setSubmitLoading(false);
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(false);
      setImgError(true);
    }
    if (
      isValidEmail(newUser.email) &&
      isValidPassword(newUser.password) &&
      !isValidUsername(newUser.username) &&
      !selectedFile
    ) {
      setSubmitLoading(false);
      setUsernameError(true);
      setImgError(true);
      setEmailError(false);
      setPasswordError(false);
    }
    if (
      isValidEmail(newUser.email) &&
      !isValidPassword(newUser.password) &&
      !isValidUsername(newUser.username) &&
      !selectedFile
    ) {
      setSubmitLoading(false);
      setEmailError(false);
      setUsernameError(true);
      setPasswordError(true);
      setImgError(true);
    }
    if (
      !isValidEmail(newUser.email) &&
      !isValidPassword(newUser.password) &&
      !isValidUsername(newUser.username) &&
      isImg
    ) {
      setSubmitLoading(false);
      setImgError(false);
      setEmailError(true);
      setUsernameError(true);
      setPasswordError(true);
    } */

    // Handle valid input data //
    if (
      isValidUsername(newUser.username) &&
      isValidEmail(newUser.email) &&
      isValidPassword(newUser.password) &&
      selectedFile
    ) {
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(false);
      setImgError(false);
      let urlencoded = new URLSearchParams();
      urlencoded.append("username", newUser.username);
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
      urlencoded.append("avatar", newUser.avatar);
      const requestOptions = {
        method: "POST",
        body: urlencoded,
      };
      try {
        const response = await fetch(
          baseURL + "/api/users/signup",
          requestOptions
        );
        const results = await response.json();
        console.log("Result:", results);
        toast({
          title: "Registration successful",
          status: "success",
          variant: "subtle",
          duration: 1500,
          isClosable: true,
        });
        setSubmitLoading(false);
        redirect("/login");
      } catch (error) {
        setSubmitLoading(false);
        console.log("Fetch error", error);
      }
    } else {
      alert("sry");
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect in SignUp ran");
  }, []);

  return (
    <Container>
      <FormControl mb="4" isInvalid={usernameError}>
        <FormLabel>Username</FormLabel>
        <Input
          variant="custom"
          id="username"
          type="text"
          //ref="username"
          name="username"
          placeholder="e. g. musiclover030"
          value={newUser.username ? newUser.username : ""}
          onChange={handleChangeHandler}
        />
        {usernameError ? (
          <FormHelperText color="red.300">Invalid username</FormHelperText>
        ) : null}
      </FormControl>
      <FormControl mb="4" isInvalid={emailError}>
        <FormLabel>E-Mail</FormLabel>
        <Input
          variant="custom"
          type="text"
          name="email"
          id="email"
          placeholder="e. g. this@that.okay"
          //ref="email"
          value={newUser.email ? newUser.email : ""}
          onChange={handleChangeHandler}
        />
        {emailError ? (
          <FormHelperText color="red.300">Invalid email address</FormHelperText>
        ) : null}
      </FormControl>
      <FormControl mb="4" isInvalid={passwordError}>
        <FormLabel>Password</FormLabel>
        <Input
          variant="custom"
          type="password"
          name="password"
          id="password"
          placeholder="At least 6 characters"
          //ref="password"
          value={newUser.password ? newUser.password : ""}
          onChange={handleChangeHandler}
        />
        {passwordError ? (
          <FormHelperText color="red.300">Invalid password</FormHelperText>
        ) : null}
      </FormControl>
      <FormControl mb="8" display="flex" flexDir="column" isInvalid={imgError}>
        <FormLabel>Profile Picture</FormLabel>
        <Input
          variant="custom"
          type="file"
          accept=".jpg, .jpeg, .png"
          name="image"
          onChange={attachFileHandler}
          p="2"
          mb="2"
        />
        {imgError ? (
          <FormHelperText color="red.300">
            Please be so kind and provide a profile picture. It can be anything,
            really.
          </FormHelperText>
        ) : null}
        {!newUser.avatar && (
          <Center>
            <IconButton
              sx={{ bgColor: "green.200" }}
              w={["80", "40"]}
              leftIcon={<RiUploadCloud2Line />}
              p="2"
              isLoading={imgLoading ? true : false}
              isDisabled={!isImg ? true : false}
              onClick={submitForm}
            >
              <Text>Upload</Text>
            </IconButton>
          </Center>
        )}
      </FormControl>
      {/* Show the upload result */}
      {newUser.avatar && (
        <Center>
          <Image
            borderRadius="full"
            border="1px"
            fit="fill"
            boxSize="32"
            src={newUser.avatar}
            alt="user pic"
            my="2"
          />
        </Center>
      )}
      <Center>
        <Button
          w={["80", "40"]}
          isLoading={submitLoading ? true : false}
          isDisabled={!isInput ? true : false}
          onClick={registerNewUser}
        >
          Register
        </Button>
      </Center>
    </Container>
  );
}

export default SignUp;
