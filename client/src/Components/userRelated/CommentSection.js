import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Flex,
  HStack,
  Button,
  Icon,
  Text,
  Avatar,
  useToast,
  FormControl,
  VStack,
  IconButton,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, WarningIcon } from "@chakra-ui/icons";
import { FiSend } from "react-icons/fi";
import { PlaylistContext } from "../../context/PlaylistContext";

const CommentSection = ({ playlist, comments, setComments }) => {
  const { user, userProfile } = useContext(AuthContext);
  const { _id } = useParams();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [newComment, setNewComment] = useState({
    userId: "",
    text: "",
  });

  const handleChangeHandler = (event) => {
    console.log(event.target.value);
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });
  };

  // POST a new comment

  const postComment = async (event) => {
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
        `http://localhost:5000/api/playlists/${playlist._id}/new-comment`,
        requestOptions
      );
      const result = await response.json();
      console.log("Fetch result", result);
      setNewComment("");
      setComments(comments);
    } catch (error) {
      console.log("Error in POST a comment func", error);
    }
  };

  // PUT (remove) a Comment

  const removeComment = async ({ currentTarget }) => {
    const myHeaders = new Headers();
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
        `http://localhost:5000/api/playlists/${playlist._id}/delete-comment`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      onClose();
      setComments(comments);
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
  };

  return (
    <>
      <Text fontSize="2xl">Comments</Text>
      {playlist.comments?.map((comment) => {
        return (
          <Flex
            boxShadow="sm"
            bgColor={
              comment.author === userProfile._id ? "green.50" : "gray.50"
            }
            borderRadius="xl"
            border="1px"
            borderColor="gray.100"
            p="3"
            w={["xs", "md", "lg"]}
            h="auto"
            key={comment._id}
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
                    {comment.author !== userProfile._id && comment.username}
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
                      onClick={onOpen}
                      value={comment._id}
                    />

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
                              {/*   <br />
                              This action cannot be undone. */}
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
                    </AlertDialog>
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
                bgColor="gray.50"
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
  );
};

export default CommentSection;
