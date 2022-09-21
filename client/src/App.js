import "./Styles/App.css";
import { ChakraProvider } from "@chakra-ui/react";
import LandingView from "./Views/LandingView";
import theme from "./Styles/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <LandingView />
      </div>
    </ChakraProvider>
  );
}

export default App;
