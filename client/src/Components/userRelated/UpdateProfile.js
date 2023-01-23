import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PlaylistContext } from "../../context/PlaylistContext";
import { useParams } from "react-router-dom";
import useGetMeToken from "../../hooks/useGetMeToken";
import { baseURL } from "../../utils/getServerUrl";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  IconButton,
  Input,
  Text,
  FormControl,
  useToast,
  VStack,
  FormHelperText,
} from "@chakra-ui/react";
import { isValidEmail, isValidUsername } from "../../utils/validators";

function UpdateProfile() {
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const { myPlaylists, setMyPlaylists } = useContext(PlaylistContext);
  const { _id } = useParams();
  const { getMyToken } = useGetMeToken();
  const email = useRef();
  const username = useRef();
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const toast = useToast();

  // Handling editable inputs

  const openEmailEditable = () => setIsEditingEmail(true);
  const closeEmailEditable = () => {
    setIsEditingEmail(false);
    setEmailError(false);
  };
  const openUsernameEditable = () => setIsEditingUsername(true);
  const closeUsernameEditable = () => {
    setIsEditingUsername(false);
    setUsernameError(false);
  };
  const handleEmailSubmit = () => {
    if (!isValidEmail(email.current.value)) {
      setEmailError(true);
    }
    if (isValidEmail(email.current.value)) {
      setIsEditingEmail(false);
      setEmailError(false);
      setNewEmail(email.current.value);
    }
  };
  const handleUsernameSubmit = () => {
    if (!isValidUsername(username.current.value)) {
      setUsernameError(true);
    }
    if (isValidUsername(username.current.value)) {
      setIsEditingUsername(false);
      setUsernameError(false);
      setNewUsername(username.current.value);
    }
  };

  // PATCH req to update user

  const updateUser = async (event) => {
    event.preventDefault();
    const token = getMyToken();
    if (!token) {
      alert("No token");
    }
    if (token) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("_id", `${userProfile._id}`);
        const toBeUpdated = JSON.stringify({
          email: newEmail ? newEmail : userProfile.email,
          username: newUsername ? newUsername : userProfile.username,
        });
        const requestOptions = {
          method: "PATCH",
          headers: myHeaders,
          body: toBeUpdated,
        };
        const response = await fetch(
          baseURL + `/api/users/profile/${_id}/update-profile`,
          requestOptions
        );
        const result = await response.json();
        setUserProfile(result.userUpdated);
        //TODO - updating state of playlists after user update not working yet
        setMyPlaylists(
          myPlaylists.map((list) => {
            if (list.creator._id === result.userUpdated._id) {
              return { ...list, username: result.userUpdated.username };
            }
            return list;
          })
        );
        toast({
          duration: 2000,
          position: "top",
          render: () => (
            <Box
              bg="gray.200"
              boxShadow="2px 2px"
              p={3}
              textAlign="center"
              fontSize="lg"
              fontWeight="semibold"
              letterSpacing="wide"
              fontFamily="body"
            >
              {result.message}
            </Box>
          ),
        });
        console.log(result);
      } catch (error) {
        console.log(error);
        return alert(error.message);
      }
    } else {
      return alert("No token for this user");
    }
  };

  return (
    <VStack spacing="6">
      <Container>
        <Text fontWeight="extrabold">Email</Text>
        {isEditingEmail ? (
          <VStack>
            <FormControl isInvalid={emailError}>
              <Input
                ref={email}
                bgColor="whiteAlpha.900"
                focusBorderColor="blackAlpha.900"
                errorBorderColor="red.300"
              />
              {emailError ? (
                <FormHelperText color="red.300">
                  Please enter a valid email adress
                </FormHelperText>
              ) : null}
              <ButtonGroup justifyContent="center" size="sm" spacing="4" pt="2">
                <IconButton
                  icon={<CheckIcon />}
                  onClick={handleEmailSubmit}
                  bgColor="green.200"
                />
                <IconButton
                  icon={<CloseIcon />}
                  onClick={closeEmailEditable}
                  bgColor="red.300"
                  _hover={{ bg: "pink.500" }}
                />
              </ButtonGroup>
            </FormControl>
          </VStack>
        ) : (
          <VStack>
            <Text>{newEmail ? newEmail : userProfile.email}</Text>
            <Flex justifyContent="center">
              <IconButton
                icon={<EditIcon />}
                size="sm"
                onClick={openEmailEditable}
              />
            </Flex>
          </VStack>
        )}
      </Container>
      <Divider borderColor="blackAlpha.900" />
      <Container>
        <Text fontWeight="extrabold">Username</Text>
        {isEditingUsername ? (
          <VStack>
            <FormControl isInvalid={usernameError}>
              <Input
                ref={username}
                bgColor="whiteAlpha.900"
                focusBorderColor="blackAlpha.900"
              />
              {usernameError ? (
                <FormHelperText color="red.300">
                  Invalid username
                </FormHelperText>
              ) : null}
              <ButtonGroup justifyContent="center" size="sm" spacing="4" pt="2">
                <IconButton
                  icon={<CheckIcon />}
                  onClick={handleUsernameSubmit}
                  bgColor="green.200"
                />
                <IconButton
                  icon={<CloseIcon />}
                  onClick={closeUsernameEditable}
                  bgColor="red.300"
                  _hover={{ bg: "pink.500" }}
                />
              </ButtonGroup>
            </FormControl>
          </VStack>
        ) : (
          <VStack>
            <Text>{newUsername ? newUsername : userProfile.username}</Text>
            <IconButton
              icon={<EditIcon />}
              size="sm"
              onClick={openUsernameEditable}
            />
          </VStack>
        )}
      </Container>
      <Divider borderColor="blackAlpha.900" />
      {(newEmail && newEmail !== userProfile.email) ||
      (newUsername && newUsername !== userProfile.username) ? (
        <Button onClick={updateUser}>Save changes</Button>
      ) : null}
    </VStack>
  );
}

export default UpdateProfile;
