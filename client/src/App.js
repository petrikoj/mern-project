import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext.js";
import ProtectedRoute from "./components/userRelated/ProtectedRoute";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import LandingView from "./views/LandingView";
import SignUpView from "./views/SignUpView";
import LoginView from "./views/LoginView";
import ProfileView from "./views/ProfileView";
import Navbar from "./components/layoutRelated/Navbar.js";
import PostPlaylistView from "./views/PostPlaylistView.js";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ChakraProvider theme={theme}>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/signup" element={<SignUpView />} />
        <Route path="/login" element={<LoginView />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-playlist"
          element={
            <ProtectedRoute>
              <PostPlaylistView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
