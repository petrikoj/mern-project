import { useState } from "react";
import { Container } from "@chakra-ui/react";

function SignUp() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});

  const handleChangeHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const attachFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log("Selected file:", selectedFile);
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
      setNewUser({ ...newUser, user_avatar: result.user_img });
    } catch (error) {}
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
          value={newUser.user_email ? newUser.user_email : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={newUser.password ? newUser.password : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <form>
        <input type="file" onChange={attachFileHandler} />
        <button onClick={submitForm}>Upload img</button>
      </form>
      {newUser.user_avatar && <img src={newUser.user_avatar} alt="userPic" />}
    </Container>
  );
}

export default SignUp;
