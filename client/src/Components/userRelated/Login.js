import { React, useState, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { isValidEmail, isValidPassword } from "../../utils/validators.js";

function Login() {
  const [userLogin, setUserLogin] = useState({});
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [credentialsError, setCredentialsError] = useState(null);

  const handleChangeHandler = (event) => {
    setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
    console.log(userLogin);
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
          "http://localhost:5000/api/users/login",
          requestOptions
        );
        const result = await response.json();
        const token = result.token;

        if (token) {
          localStorage.setItem("token", token);
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
    <Box>
      <h2>Login</h2>
      <Container>
        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            type="text"
            name="email"
            id="email"
            value={userLogin.email ? userLogin.email : ""}
            onChange={handleChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userLogin.password ? userLogin.password : ""}
            onChange={handleChangeHandler}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </Container>
    </Box>
  );
}

export default Login;