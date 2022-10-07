import { useState } from "react";
import { Container } from "@chakra-ui/react";
import { isValidEmail, isValidPassword } from "../../utils/validators";

function SignUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [error, setError] = useState(null);

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
    let urlencoded = new URLSearchParams();
    urlencoded.append("username", newUser.username);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append(
      "avatar",
      newUser.avatar
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
  };

  return (
    <Container>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={newUser.username ? newUser.username : ""}
          name="username"
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="email">E-Mail</label>
        <input
          type="text"
          name="email"
          id="email"
          value={newUser.email ? newUser.email : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={newUser.password ? newUser.password : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <form>
        <input type="file" name="image" onChange={attachFileHandler} />
        <button onClick={submitForm}>Upload img</button>
      </form>
      {newUser.avatar && <img src={newUser.avatar} alt="user pic" />}
      <button onClick={registerNewUser}>Sign up</button>
    </Container>
  );
}

export default SignUp;
