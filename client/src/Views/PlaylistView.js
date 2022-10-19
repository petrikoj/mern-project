import React from "react";
import { useFetchPlaylists } from "../components/userRelated/FetchPlaylists.js";
import {
  Badge,
  Box,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import LoadingSpinner from "../components/layoutRelated/Spinner.js";
import { Link } from "react-router-dom";

function PlaylistView() {
  const { playlists, error, loading } = useFetchPlaylists();
  return (
    <Center>
      <VStack>
        <Heading>Playlists</Heading>
        <Box>
          {loading && <LoadingSpinner />}
          {error && <p>error</p>}
          <SimpleGrid columns={[2, 4]} spacing="10">
            {playlists &&
              playlists.map((list, index) => {
                return (
                  <Box key={index} overflowX="hidden" overflowY="auto">
                    <Link to={`/playlists/${list._id}`}>
                      <Center>
                        <Image
                          boxSize="36"
                          src={list.img_url}
                          fit="cover"
                          borderRadius="md"
                        />
                      </Center>
                      <Center>
                        <VStack>
                          <Text as="b">{list.title}</Text>
                          <Text>{list.creator.username}</Text>
                        </VStack>
                      </Center>
                      <Badge>{list.songs.length} songs</Badge>
                      <Badge>{list.mood}</Badge>
                      <Text>{list.description}</Text>
                    </Link>
                  </Box>
                );
              })}
          </SimpleGrid>
        </Box>
      </VStack>
    </Center>
  );
}

export default PlaylistView;
