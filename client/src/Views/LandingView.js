import React from "react";
import { Center, Heading, VStack } from "@chakra-ui/react";
import useFetch from "../Hooks/useFetch";

function LandingView() {
  const {
    data: playlists,
    loading,
    error,
  } = useFetch("http://localhost:5000/api/all");
  console.log(playlists);

  return (
    <Center>
      <VStack>
        <Heading fontFamily="body">Hello World</Heading>
        {playlists.map((playlist, id) => {
          return (
            <div key={id}>
              <h2>{playlist.title}</h2>
              <p>{playlist.author}</p>
              {playlist.songs.map((song, id) => {
                return (
                  <div key={id}>
                    <p>{song.artist}</p>
                    <p>"{song.song_title}"</p>
                  </div>
                );
              })}
            </div>
          );
        })}
        ;
      </VStack>
    </Center>
  );
}

export default LandingView;
