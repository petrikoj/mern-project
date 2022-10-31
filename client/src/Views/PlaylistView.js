import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
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
//import LikeAndUnlikeButton from "../components/userRelated/LikeAndUnlikeButton.js";

function PlaylistView() {
  const { userProfile, user } = useContext(AuthContext);
  const { myPlaylists, error, loading } = useContext(PlaylistContext);

  return (
    <Center mx={["2", "6", "10"]}>
      <VStack>
        <Heading>All</Heading>
        <Box>
          {loading && <LoadingSpinner />}
          {/* {loading && (
            <Skeleton>
            </Skeleton>
          )} */}
          {error && <p>error</p>}
          <SimpleGrid columns={[1, 2, 4]} spacing={["3", "10"]}>
            {myPlaylists &&
              myPlaylists.map((list) => {
                return (
                  <Box key={list._id}>
                    <Link to={`/playlists/${list._id}`}>
                      <Center>
                        <Image
                          boxSize={["64", "72"]}
                          /* width={["36", "44", "52"]}
                          height={["36", "44", "52"]} */
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
                          <HStack>
                            <Avatar
                              size={["xs", "md"]}
                              src={list.creator.avatar}
                              border="1px"
                            />
                            {user && userProfile._id === list.creator._id ? (
                              <Text
                                fontSize={["sm", "md"]}
                                letterSpacing="wide"
                                fontWeight="thin"
                              >
                                You
                              </Text>
                            ) : (
                              <Text
                                fontSize={["sm", "md"]}
                                letterSpacing="wide"
                                fontWeight="thin"
                              >
                                {list.creator.username}
                              </Text>
                            )}
                          </HStack>
                        </VStack>
                      </Center>
                    </Link>
                    <Badge>{list.songs.length} songs</Badge>
                    <Badge>{list.mood}</Badge>
                    {/*  <LikeAndUnlikeButton
                      playlist_id={list._id}
                      user_id={userProfile._id}
                      isLiked={
                        list.liked_by?.includes(userProfile._id) ? true : false
                      }
                    /> */}
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
