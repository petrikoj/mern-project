import React, { useContext, useState } from "react";
import { Box, Button, Center, Heading, VStack } from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import SignUp from "../components/userRelated/SignUp.js";
import Login from "../components/userRelated/Login.js";
import PostPlaylist from "../components/userRelated/PostPlaylist";
import { AuthContext } from "../context/AuthContext.js";
import { Link } from "react-router-dom";

function LandingView() {
  const { user, userProfile } = useContext(AuthContext);

  return (
    <Center>
      <VStack>
        <Box mb="6">
          {user ? (
            <Heading fontFamily="body">Hello {userProfile?.username}</Heading>
          ) : (
            <Heading fontFamily="body">Hello World</Heading>
          )}
        </Box>

        {user && (
          <Link to={"/playlists/all"}>
            <Button>Explore</Button>
          </Link>
        )}
        {/* {playlists &&
          playlists.map((playlist) => {
            return (
              <div key={playlist._id}>
                <h2>{playlist.title}</h2>
                <p>{playlist.author.username}</p>
                {playlist.songs.map((song, i) => {
                  return (
                    <div key={i}>
                      <p>{song.artist}</p>
                      <p>"{song.song_title}"</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        ; */}
        {/*  <SignUp />
        <Login />
        <Profile />
        <PostPlaylist /> */}
      </VStack>
    </Center>
  );
}

export default LandingView;
