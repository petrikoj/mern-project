import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import ProtectedRoute from "./components/userRelated/ProtectedRoute";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import LandingView from "./views/LandingView";
import SignUpView from "./views/SignUpView";
import LoginView from "./views/LoginView";
import ProfileView from "./views/ProfileView";
import Navbar from "./components/layoutRelated/Navbar.js";
import PostPlaylistView from "./views/PostPlaylistView.js";
import PlaylistView from "./views/PlaylistView.js";
import DetailView from "./views/DetailView.js";
import NoMatchView from "./views/NoMatchView.js";

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
          path="/profile/:_id"
          element={
            <ProtectedRoute>
              <ProfileView />
            </ProtectedRoute>
          }
        />
        <Route path="/playlists/all" element={<PlaylistView />} />
        <Route path="/playlists/:_id" element={<DetailView />} />
        <Route
          path="/create-playlist"
          element={
            <ProtectedRoute>
              <PostPlaylistView />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatchView />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
