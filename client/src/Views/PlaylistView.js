import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  GridItem,
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
        {loading && <LoadingSpinner />}
        {error && <p>error</p>}
        <Heading>All</Heading>
        <SimpleGrid spacingY="8">
          {myPlaylists &&
            myPlaylists.map((list) => {
              return (
                <Box
                  key={list._id}
                  w={["80", "container.sm"]}
                  border="2px solid"
                  borderRadius="base"
                  borderColor="blackAlpha.900"
                  boxShadow="2px 2px black"
                >
                  <HStack
                    borderBottom="2px"
                    borderColor="blackAlpha.900"
                    p="1"
                    /*  mb="1.5" */
                    bgColor="purple.200"
                  >
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
                      <Image
                        boxSize={["80", "container.sm"]}
                        src={list.img_url}
                        fit="cover"
                      />
                    </Center>
                  </Link>
                  <VStack
                    borderTop="2px solid"
                    borderColor="blackAlpha.900"
                    bgColor="whiteAlpha.900"
                  >
                    <Text as="b" align="center">
                      {list.title}
                    </Text>
                    <HStack borderTop="1px" w="full">
                      <Badge boxShadow="2px 2px black">
                        {list.songs.length} songs
                      </Badge>
                      <Badge boxShadow="2px 2px black">{list.mood}</Badge>
                      <Button leftIcon={<ChatIcon />} variant="ghost">
                        <Text>{list.comments?.length}</Text>
                      </Button>
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
                    </HStack>
                    {/*  <LikeAndUnlikeButton
                      playlist_id={list._id}
                      user_id={userProfile._id}
                      isLiked={
                        list.liked_by?.includes(userProfile._id) ? true : false
                      }
                    /> */}
                    {/*  <HStack>
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
                      </HStack> */}
                  </VStack>
                </Box>
              );
            })}
        </SimpleGrid>
      </VStack>
    </Center>
  );
}

export default PlaylistView;
