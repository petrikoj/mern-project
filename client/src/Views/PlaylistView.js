import React from "react";
import { useFetchPlaylists } from "../components/userRelated/FetchPlaylists.js";
import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import LoadingSpinner from "../components/layoutRelated/Spinner.js";
import { Link } from "react-router-dom";
import LikeAndUnlikeButton from "../components/userRelated/LikeAndUnlikeButton.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

function PlaylistView() {
  const { userProfile, user } = useContext(AuthContext);
  const { playlists, error, loading } = useFetchPlaylists();
  return (
    <Center>
      <VStack>
        <Heading>Playlists</Heading>
        <Box>
          {loading && <LoadingSpinner />}
          {error && <p>error</p>}
          <SimpleGrid columns={[2, 4]} spacing="3">
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
                    {/* <Button variant="unstlyed" size="lg">
                      <Icon as={BsBookmarkHeart} />
                    </Button> */}
                    <LikeAndUnlikeButton
                      playlist_id={list._id}
                      user_id={userProfile._id}
                    />
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
