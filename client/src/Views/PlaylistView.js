import React from "react";
import FetchPlaylists from "../components/userRelated/FetchPlaylists.js";
import { Center, Heading, VStack } from "@chakra-ui/react";

function PlaylistView() {
  return (
    <Center>
      <VStack>
        <Heading>Playlists</Heading>
        <FetchPlaylists />
      </VStack>
    </Center>
  );
}

export default PlaylistView;
