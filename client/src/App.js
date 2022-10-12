import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.js";
import ProtectedRoute from "./components/userRelated/ProtectedRoute";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import LandingView from "./views/LandingView";
import SignUpView from "./views/SignUpView";
import LoginView from "./views/LoginView";
import ProfileView from "./views/ProfileView";
import PostPlaylist from "./components/userRelated/PostPlaylist";
import Navbar from "./components/layoutRelated/Navbar.js";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Navbar />
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
                  <PostPlaylist />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
