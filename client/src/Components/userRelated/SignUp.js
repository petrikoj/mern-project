import { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { isValidEmail, isValidPassword } from "../../utils/validators";

function SignUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  // const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [credentialsError, setCredentialsError] = useState(null);

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
    <Container>
      <FormLabel>Username</FormLabel>
      <Input
        id="username"
        type="text"
        value={newUser.username ? newUser.username : ""}
        name="username"
        placeholder="e. g. musiclover030"
        onChange={handleChangeHandler}
      />
      <FormLabel>E-Mail</FormLabel>
      <Input
        type="text"
        name="email"
        id="email"
        placeholder="e. g. this@that.okay"
        value={newUser.email ? newUser.email : ""}
        onChange={handleChangeHandler}
      />
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Must contain at least 6 characters"
        value={newUser.password ? newUser.password : ""}
        onChange={handleChangeHandler}
      />
      <FormControl>
        <FormLabel>Profile Picture</FormLabel>
        <Input type="file" name="image" onChange={attachFileHandler} />
        <Button onClick={submitForm}>Upload img</Button>
      </FormControl>
      {newUser.avatar && <img src={newUser.avatar} alt="user pic" />}
      <Button onClick={registerNewUser}>Sign up</Button>
    </Container>
  );
}

export default SignUp;
