import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PlaylistContext } from "../../context/PlaylistContext";
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
  Spacer,
  useToast,
  FormControl,
  VStack,
  Heading,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";

const CommentSection = ({ playlist }) => {
  const { user, userProfile } = useContext(AuthContext);
  const { myPlaylists, setMyPlaylists } = useContext(PlaylistContext);
  const { _id } = useParams();
  //console.log("Logging playlist._id", _id, "and user._id", userProfile._id);

  const toast = useToast();

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

  const postComment = async () => {
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
        "http://localhost:5000/api/playlists/:id/new-comment",
        requestOptions
      );
      setNewComment("");
      setMyPlaylists(myPlaylists);
      const result = await response.json();
      console.log("Fetch result", result);
    } catch (error) {
      console.log("Error in POST a comment func", error);
    }
  };

  // PUT (remove) a Comment

  const removeComment = async ({ commentId }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("playlistId", _id);
    urlencoded.append("userId", userProfile._id);
    urlencoded.append("commentId", commentId);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/playlists/:id/delete-comment",
        requestOptions
      );
      const result = await response.json();
      setMyPlaylists(myPlaylists);
      console.log(result);
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
              comment.author === userProfile._id ? "red.100" : "gray.100"
            }
            borderRadius="xl"
            p="3"
            w={["xs", "md", "lg"]}
            h="auto"
            key={comment._id}
          >
            <Flex align="start">
              <Avatar
                size={["sm", "md"]}
                src={comment.userphoto}
                border="1px"
              />
              <Box ml="3">
                <Text fontWeight="light" fontSize="xs">
                  {comment.createdAt}
                </Text>
                <Text fontWeight="semibold">
                  {comment.author === userProfile._id
                    ? "You"
                    : comment.username}
                </Text>
                <Text
                  fontWeight="light"
                  letterSpacing="wide"
                  fontSize={["md", "lg"]}
                >
                  {comment.text}
                </Text>
              </Box>
            </Flex>
            {/* <VStack align="stretch">
              <HStack align="center" mb="1">
                <Avatar
                  size={["sm", "md"]}
                  src={comment.userphoto}
                  border="1px"
                />
                <VStack align="start">
                  <Text fontWeight="light" fontSize="xs">
                    {comment.createdAt}
                  </Text>
                  <Text fontWeight="semibold">
                    {comment.author === userProfile._id
                      ? "You"
                      : comment.username}
                  </Text>
                </VStack> */}
            {comment.author === userProfile._id && (
              <IconButton
                pl="16"
                icon={<DeleteIcon />}
                variant="unstyled"
                size="sm"
                onClick={removeComment}
                commentid={comment._id}
              />
            )}
            {/* </HStack>
              <Text
                fontWeight="light"
                letterSpacing="wide"
                fontSize={["md", "lg"]}
              >
                {comment.text}
              </Text>
            </VStack> */}
          </Flex>
        );
      })}
      <HStack my={"5"}>
        <FormControl>
          <InputGroup size="md">
            <Input
              placeholder={"Write a comment ..."}
              focusBorderColor="blackAlpha.900"
              variant="filled"
              bgColor="red.100"
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
                <Icon as={FiSend} color={"blackAlpha.900"} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </HStack>
    </>
  );
};

export default CommentSection;
