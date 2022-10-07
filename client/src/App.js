import "./styles/App.css";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import LandingView from "./views/LandingView";
import theme from "./styles/theme";
import getToken from "./utils/getToken.js";

function App() {
  const [user, setUser] = useState(null);

  const isUserLoggedIn = () => {
    const token = getToken();
    if (token) {
      setUser(true);
      console.log("User logged in");
    }
    if (!token) {
      setUser(false);
      console.log("User NOT logged in");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
    console.log("User?", user);
  };

  useEffect(() => {
    isUserLoggedIn();
  }, [user]);

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <LandingView />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </ChakraProvider>
  );
}

export default App;
