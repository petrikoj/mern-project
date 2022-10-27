import React, { useContext, useEffect, useRef, useState } from "react";
import { useFetchPlaylistById } from "../components/userRelated/FetchPlaylists.js";
import {
  Box,
  Center,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Th,
  Td,
  Thead,
  Tr,
  VStack,
  Text,
  Tag,
  Divider,
  HStack,
  IconButton,
  Button,
  ButtonGroup,
  Container,
  Flex,
} from "@chakra-ui/react";
import { ChatIcon, EditIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/layoutRelated/Spinner.js";
import { ErrorAlert } from "../components/layoutRelated/Alerts.js";
import { AuthContext } from "../context/AuthContext.js";
import UnlikeButton from "../components/userRelated/UnlikeButton.js";
import LikeButton from "../components/userRelated/LikeButton.js";
import { PlaylistContext } from "../context/PlaylistContext.js";
import CommentSection from "../components/userRelated/CommentSection.js";
//import LikeAndUnlikeButton from "../components/userRelated/LikeAndUnlikeButton.js";
/* import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext.js"; */

function DetailView() {
  const { userProfile, user } = useContext(AuthContext);
  const { _id } = useParams();
  const { playlist, comments, setComments, error, loading, getPlaylist } =
    useFetchPlaylistById(_id);
  //const myCommentSection = useRef(null);

  /* const scrollToComments = () => {
    window.scrollTo({
      top: myCommentSection.current.offsetTop,
      behavior: "smooth",
    });
  }; */

  useEffect(() => {
    getPlaylist(_id);
  }, [comments]);

  return (
    <Center m="2" w="auto" h="auto">
      <VStack>
        {loading && <LoadingSpinner />}
        {error && <ErrorAlert message={error.message} />}
        {playlist && (
          <>
            <Heading>{playlist.title}</Heading>
            <Image
              src={playlist.img_url}
              alt="playlist picture"
              boxSize={["fit-content", "lg"]}
              borderRadius="lg"
            />
            <Divider borderColor="blackAlpha.900" />
            <Tag>{playlist.mood}</Tag>

            <Text>{playlist.description}</Text>
            <Divider borderColor="blackAlpha.900" />

            <ButtonGroup spacing={["4", "8"]} variant="ghost" size="lg">
              {playlist.creator?._id === userProfile._id && (
                <IconButton icon={<EditIcon />} />
              )}
              <Button leftIcon={<ChatIcon />}>
                <Text fontSize="md" fontWeight="semibold">
                  {playlist.comments?.length}
                </Text>
              </Button>
              <HStack>
                {/*  <LikeAndUnlikeButton
                  playlist_id={playlist._id}
                  user_id={userProfile._id}
                /> */}
                {playlist.liked_by?.includes(userProfile._id) ? (
                  <UnlikeButton
                    playlist_id={playlist._id}
                    user_id={userProfile._id}
                  />
                ) : (
                  <LikeButton
                    playlist_id={playlist._id}
                    user_id={userProfile._id}
                  />
                )}
                <Text fontSize="md" fontWeight="semibold">
                  {playlist.liked_by?.length}
                </Text>
              </HStack>
            </ButtonGroup>

            <Container>
              {playlist.songs?.map((song) => {
                return (
                  <Box key={song._id} ml="2" p="1" my="1">
                    <Text fontSize="md" fontWeight="semibold">
                      {song.song_title}
                    </Text>
                    <Text fontSize="sm" fontWeight="thin">
                      {song.artist}
                    </Text>
                    <Divider borderColor="gray.200" />
                  </Box>
                );
              })}
            </Container>
            <Divider borderColor="blackAlpha.900" />
            <CommentSection
              playlist={playlist}
              comments={comments}
              setComments={setComments}
            />
          </>
        )}
      </VStack>
    </Center>
  );
}

export default DetailView;
