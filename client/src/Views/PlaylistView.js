import React, { useEffect, useState } from "react";
import { useFetchPlaylists } from "../components/userRelated/FetchPlaylists.js";
import {
  Badge,
  Box,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import LoadingSpinner from "../components/layoutRelated/Spinner.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { PlaylistContext } from "../context/PlaylistContext.js";
import LikeButton from "../components/userRelated/LikeButton.js";
import UnlikeButton from "../components/userRelated/UnlikeButton.js";

function PlaylistView() {
  const { userProfile, user } = useContext(AuthContext);
  const { myPlaylists, error, loading } = useContext(PlaylistContext);

  return (
    <Center mx={["2", "6", "10"]}>
      <VStack>
        <Heading>Playlists</Heading>
        <Box>
          {loading && <LoadingSpinner />}
          {error && <p>error</p>}
          <SimpleGrid columns={[2, 4, 6]} spacing={["3", "10"]}>
            {myPlaylists &&
              myPlaylists.map((list, index) => {
                return (
                  <Box key={index} overflowX="hidden" overflowY="auto">
                    <Link to={`/playlists/${list._id}`}>
                      <Center>
                        <Image
                          //boxSize={["36"]}
                          width={["36", "44", "52"]}
                          height={["36", "44", "52"]}
                          src={list.img_url}
                          fit={["cover"]}
                          borderRadius="md"
                          boxShadow="md"
                        />
                      </Center>
                      <Center>
                        <VStack>
                          <Text as="b" align="center">
                            {list.title}
                          </Text>
                          {user && userProfile._id === list.creator._id ? (
                            <Text align="center" as="i">
                              You
                            </Text>
                          ) : (
                            <Text align="center">{list.creator.username}</Text>
                          )}
                        </VStack>
                      </Center>
                    </Link>
                    <Badge>{list.songs.length} songs</Badge>
                    <Badge>{list.mood}</Badge>
                    {list.liked_by?.includes(userProfile._id) ? (
                      <UnlikeButton
                        playlist_id={list._id}
                        user_id={userProfile._id}
                      />
                    ) : (
                      <LikeButton
                        playlist_id={list._id}
                        user_id={userProfile._id}
                      />
                    )}
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
