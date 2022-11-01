import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Highlight,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  Spacer,
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
import { ChatIcon } from "@chakra-ui/icons";
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
          <SimpleGrid columns={[1, 2, 4]} spacing={["5", "10", "14"]}>
            {myPlaylists &&
              myPlaylists.map((list) => {
                return (
                  <Box
                    key={list._id}
                    w="80"
                    border="1px"
                    borderRadius="md"
                    borderColor="yellow.100"
                  >
                    <HStack borderBottom="1px" p="1" mb="1.5">
                      <Avatar
                        size={["xs", "md"]}
                        src={list.creator.avatar}
                        border="1px"
                      />
                      {user && userProfile._id === list.creator._id ? (
                        <Text
                          fontSize={["sm", "md"]}
                          letterSpacing="wide"
                          fontWeight="medium"
                        >
                          <Highlight
                            query="you"
                            styles={{
                              rounded: "full",
                              px: "1.5",
                              py: "1.5",
                              bg: "purple.100",
                            }}
                          >
                            You
                          </Highlight>
                        </Text>
                      ) : (
                        <Text
                          fontSize={["sm", "md"]}
                          letterSpacing="wide"
                          fontWeight="medium"
                        >
                          {list.creator.username}
                        </Text>
                      )}
                    </HStack>

                    <Link to={`/playlists/${list._id}`}>
                      <Center>
                        <VStack>
                          <Image
                            boxSize="80"
                            /* width={["36", "44", "52"]}
                          height={["36", "44", "52"]} */
                            src={list.img_url}
                            fit={["cover"]}
                            borderRadius="md"
                          />
                          <Text as="b" align="center">
                            {list.title}
                          </Text>
                        </VStack>
                      </Center>
                    </Link>
                    <HStack>
                      <Badge>{list.songs.length} songs</Badge>
                      <Badge>{list.mood}</Badge>
                    </HStack>
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
                    <Button leftIcon={<ChatIcon />} variant="ghost">
                      <Text>{list.comments?.length}</Text>
                    </Button>
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
