import { useState, useEffect } from "react";
import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { RiUploadCloud2Line } from "react-icons/ri";
import { isValidEmail, isValidPassword } from "../../utils/validators";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  // const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [credentialsError, setCredentialsError] = useState(null);
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
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    console.log("selectedFile:", selectedFile);
    console.log("formData:", formData);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/image-upload",
        requestOptions
      );
      const result = await response.json();
      console.log("Result:", result);
      setNewUser({ ...newUser, avatar: result.avatar });
    } catch (error) {}
  };

  const registerNewUser = async () => {
    if (!isValidEmail(newUser.email) && !isValidPassword(newUser.password)) {
      alert(credentialsError);
      return;
    }
    if (!isValidEmail(newUser.email)) {
      alert(emailError);
      return;
    }
    if (!isValidPassword(newUser.password)) {
      alert(passwordError);
      return;
    }

    if (isValidEmail(newUser.email) && isValidPassword(newUser.password)) {
      let urlencoded = new URLSearchParams();
      urlencoded.append("username", newUser.username);
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
      urlencoded.append(
        "avatar",
        newUser.avatar !== ""
          ? newUser.avatar
          : "https://www.kindpng.com/imgv/iwoTwxh_transparent-radio-icon-png-headphones-icon-icon-png/"
      );
      const requestOptions = {
        method: "POST",
        body: urlencoded,
      };
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/signup",
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
        redirect("/login");
      } catch (error) {
        console.log("Fetch error", error);
      }
    }
  };

  useEffect(() => {
    setCredentialsError("Wrong credentials");
    setEmailError("Wrong E-Mail");
    setPasswordError("Wrong Password");
  }, [credentialsError, emailError, passwordError]);

  return (
    <Container mb="3">
      <FormControl mb="2">
        <FormLabel>Username</FormLabel>
        <Input
          id="username"
          type="text"
          //ref="username"
          name="username"
          placeholder="e. g. musiclover030"
          value={newUser.username ? newUser.username : ""}
          onChange={handleChangeHandler}
        />
      </FormControl>

      <FormControl mb="2">
        <FormLabel>E-Mail</FormLabel>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="e. g. this@that.okay"
          //ref="email"
          value={newUser.email ? newUser.email : ""}
          onChange={handleChangeHandler}
        />
      </FormControl>

      <FormControl mb="2">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="At least 6 characters"
          //ref="password"
          value={newUser.password ? newUser.password : ""}
          onChange={handleChangeHandler}
        />
      </FormControl>

      <FormControl mb="2">
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" name="image" onChange={attachFileHandler} p="1" />
        {!newUser.avatar && (
          <IconButton
            rightIcon={<RiUploadCloud2Line />}
            p="2"
            onClick={submitForm}
          >
            <Text>Upload img</Text>
          </IconButton>
        )}
      </FormControl>
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
        <Button w={["80", "24"]} mt="4" mb="8" onClick={registerNewUser}>
          Register
        </Button>
      </Center>
    </Container>
  );
}

export default SignUp;
