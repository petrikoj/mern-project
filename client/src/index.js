import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext.js";
import { PlaylistContextProvider } from "./context/PlaylistContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PlaylistContextProvider>
          <App />
        </PlaylistContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
