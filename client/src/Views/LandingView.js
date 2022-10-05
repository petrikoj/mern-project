import React from "react";
import { Center, Heading, VStack } from "@chakra-ui/react";
import useFetch from "../Hooks/useFetch";
import SignUp from "../Components/userRelated/SignUp.js";
import Login from "../Components/userRelated/Login.js";

function LandingView() {
  // const {
  //   data: playlists,
  //   loading,
  //   error,
  // } = useFetch("http://localhost:5000/api/all");
  // console.log(playlists);

  return (
    <Center>
      <VStack>
        <Heading fontFamily="body">Hello World</Heading>
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
        <SignUp />
        <Login />
      </VStack>
    </Center>
  );
}

export default LandingView;
