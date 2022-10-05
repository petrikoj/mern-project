import "./Styles/App.css";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import LandingView from "./Views/LandingView";
import theme from "./Styles/theme";
import getToken from "./utils/getToken.js";
import removeToken from "./utils/removeToken.js";

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
    removeToken();
    setUser(false);
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
