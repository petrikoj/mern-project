import React, { useContext, useEffect, useRef, useState } from "react";
import { useFetchPlaylistById } from "../components/userRelated/FetchPlaylists.js";
import {
  Box,
  Center,
  Heading,
  Image,
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
  Stack,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Avatar,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/layoutRelated/Spinner.js";
import { ErrorAlert } from "../components/layoutRelated/Alerts.js";
import { AuthContext } from "../context/AuthContext.js";
import UnlikeButton from "../components/userRelated/UnlikeButton.js";
import LikeButton from "../components/userRelated/LikeButton.js";
import { PlaylistContext } from "../context/PlaylistContext.js";
import CommentSection from "../components/userRelated/CommentSection.js";
import { baseURL } from "../utils/getServerUrl";
//import LikeAndUnlikeButton from "../components/userRelated/LikeAndUnlikeButton.js";
/* import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext.js"; */

function DetailView() {
  const { userProfile, user } = useContext(AuthContext);
  const { _id } = useParams();
  const {
    playlist,
    setPlaylist,
    comments,
    setComments,
    likes,
    setLikes,
    getPlaylist,
    error,
    loading,
  } = useFetchPlaylistById(_id);

  const myCommentSection = useRef(null);
  const scrollToComments = () => {
    window.scrollTo({
      top: myCommentSection.current.offsetTop,
      behavior: "smooth",
    });
  };

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [newComment, setNewComment] = useState({
    userId: "",
    username: "",
    userphoto: "",
    text: "",
  });

  const handleChangeHandler = (event) => {
    console.log(event.target.value);
    setNewComment({
      ...newComment,
      userId: userProfile._id,
      username: userProfile.username,
      userphoto: userProfile.avatar,
      [event.target.name]: event.target.value,
    });
  };

  // POST a new comment

  const postComment = async (event) => {
    console.log(newComment);
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("playlistId", _id);
    urlencoded.append("userId", userProfile._id);
    urlencoded.append("username", userProfile.username);
    urlencoded.append("userphoto", userProfile.avatar);
    urlencoded.append("text", newComment.text);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        baseURL + `/api/playlists/${playlist._id}/new-comment`,
        requestOptions
      );
      const result = await response.json();
      console.log("PUT result", result);
      const newPlaylist = result.playlistUpdated;
      setPlaylist(newPlaylist);
      setNewComment("");
    } catch (error) {
      console.log("Error in POST a comment func", error);
    }
  };

  // PUT (remove) a Comment

  const removeComment = async ({ currentTarget }) => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("playlistId", _id);
      urlencoded.append("userId", userProfile._id);
      urlencoded.append("commentId", currentTarget.value);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          baseURL + `/api/playlists/${playlist._id}/delete-comment`,
          requestOptions
        );
        const result = await response.json();
        console.log("PUT result", result);
        //onClose();
        const newPlaylist = result.updatedPlaylist;
        setPlaylist(newPlaylist);
        toast({
          title: `${result.message}`,
          status: "success",
          variant: "subtle",
          duration: 1500,
          isClosable: true,
          position: "top",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("No token for this user");
    }
  };

  // DELETE playlist

  const deletePlaylist = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("_id", _id);
      urlencoded.append("creator", userProfile._id);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          baseURL + `/api/playlists/${_id}/delete-playlist`,
          requestOptions
        );
        const result = await response.json();
        console.log("result:", result);
      } catch (error) {
        console.log("error:", error);
      }
    } else {
      alert("No token for this user");
    }
  };

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
                <ButtonGroup>
                  <IconButton icon={<EditIcon />} />
                  <IconButton icon={<DeleteIcon />} onClick={deletePlaylist} />
                </ButtonGroup>
              )}
              <Button leftIcon={<ChatIcon />} onClick={scrollToComments}>
                <Text fontSize="md" fontWeight="semibold">
                  {playlist.comments?.length}
                </Text>
              </Button>
              <HStack>
                {/*  <LikeAndUnlikeButton
                  playlist_id={playlist._id}
                  user_id={userProfile._id}
                /> */}
                {userProfile.liked?.includes(playlist._id) ? (
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
            <Divider borderColor="blackAlpha.900" ref={myCommentSection} />
            {/* <CommentSection
              playlist={playlist}
              comments={comments}
              setComments={setComments}
            /> */}
            <>
              {/*  ////// Comment Section ////// */}

              <Text fontSize="2xl">Comments</Text>
              {playlist.comments?.map((comment) => {
                return (
                  <Flex
                    key={comment._id}
                    boxShadow="sm"
                    bgColor={
                      comment.author === userProfile._id
                        ? "green.50"
                        : "gray.50"
                    }
                    borderRadius="xl"
                    border="1px"
                    borderColor="gray.100"
                    p="3"
                    w={["xs", "md", "lg"]}
                    h="auto"
                    justify="start"
                  >
                    <Box>
                      <HStack pb="1.5" px="1">
                        <Avatar
                          size={["sm", "md"]}
                          src={comment.userphoto}
                          border="1px"
                        />
                        <Stack direction="row" align="center">
                          <Text fontWeight="semibold">
                            {comment.author !== userProfile._id &&
                              comment.username}
                          </Text>
                          <Text fontWeight="light" fontSize="xs">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </Text>
                        </Stack>

                        {comment.author === userProfile._id && (
                          <>
                            <IconButton
                              icon={<DeleteIcon />}
                              variant="unstyled"
                              size="sm"
                              onClick={removeComment}
                              value={comment._id}
                            />
                            {/* 
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent
                          boxSize="2xs"
                          backgroundColor="white"
                          textAlign="center"
                          fontSize="large"
                          fontWeight="thin"
                          lineHeight="tall"
                        >
                          <VStack>
                            <AlertDialogHeader>
                              <WarningIcon boxSize="2em" color="red.400" />
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Do you really want to delete your comment?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                bgColor="red.400"
                                onClick={removeComment}
                                value={comment._id}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </VStack>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog> */}
                          </>
                        )}
                      </HStack>
                      <Text
                        fontWeight="light"
                        letterSpacing="wide"
                        fontSize={["md", "lg"]}
                      >
                        {comment.text}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
              {user && (
                <HStack my={"5"}>
                  <FormControl>
                    <InputGroup size="md" my="3">
                      <Input
                        placeholder={"Write a comment ..."}
                        focusBorderColor="blackAlpha.900"
                        variant="filled"
                        bgColor="whiteAlpha.900"
                        borderRadius="full"
                        type="text"
                        name="text"
                        id="text"
                        w={["xs", "md", "lg"]}
                        value={newComment.text ? newComment.text : ""}
                        onChange={handleChangeHandler}
                      />
                      <InputRightElement>
                        <Button variant={"unstyled"} onClick={postComment}>
                          <Icon as={FiSend} />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </HStack>
              )}
            </>
          </>
        )}
      </VStack>
    </Center>
  );
}

export default DetailView;
