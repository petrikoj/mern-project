import "./Styles/App.css";
import { ChakraProvider } from "@chakra-ui/react";
import LandingView from "./Views/LandingView";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <LandingView />
      </div>
    </ChakraProvider>
  );
}

export default App;
