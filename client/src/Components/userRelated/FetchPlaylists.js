import React from "react";
import useFetch from "../../hooks/useFetch.js";
import { Box, Image as Cover, SimpleGrid, Text } from "@chakra-ui/react";
import LoadingSpinner from "../layoutRelated/Spinner.js";

const FetchPlaylists = () => {
  const {
    data: playlists,
    error,
    loading,
  } = useFetch("http://localhost:5000/api/playlists/all");
  console.log(playlists);
  return (
    <Box>
      <SimpleGrid columns={[2, 4]} spacing="10">
        {playlists &&
          playlists.map((list, _id) => {
            return (
              <Box key={_id}>
                <Text as="b">{list.title}</Text>
                <Cover
                  boxSize="36"
                  src="https://freepngstock.com/assets/img/uploads/owl-ga52a8029e_640.png"
                />
                {list.songs.map((song, index) => {
                  return (
                    <Box key={index}>
                      <Text>{song.artist}</Text>
                      <Text>{song.song_title}</Text>
                    </Box>
                  );
                })}
              </Box>
            );
          })}

        {loading && <LoadingSpinner />}
        {error && <p>error</p>}
      </SimpleGrid>
    </Box>
  );
};

export default FetchPlaylists;
