import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
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
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  Text,
  useEditableControls,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { isValidEmail } from "../../utils/validators";

function UpdateProfile() {
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const { _id } = useParams();
  const { getMyToken } = useGetMeToken();
  const email = useRef();
  const username = useRef();
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const toast = useToast();

  const handleEmailSubmit = () => {
    if (isValidEmail(email.current.value)) {
      setNewEmail(email.current.value);
    } else {
      alert("Invalid Email");
    }
  };

  const handleUsernameSubmit = () => {
    if (username.current.value !== "") {
      setNewUsername(username.current.value);
    }
  };

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

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" spacing="4" pt="2">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          bgColor="green.200"
        />
        <IconButton
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
          bgColor="red.300"
          _hover={{ bg: "pink.500" }}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <VStack spacing="6">
      <Container>
        <Text fontWeight="extrabold">Email</Text>
        <Editable
          defaultValue={userProfile.email}
          onSubmit={handleEmailSubmit}
          fontSize="lg"
          isPreviewFocusable={true}
          selectAllOnFocus={false}
        >
          <EditablePreview />
          <Input
            as={EditableInput}
            ref={email}
            bgColor="whiteAlpha.900"
            focusBorderColor="blackAlpha.900"
          />
          <EditableControls />
        </Editable>
      </Container>
      <Divider borderColor="blackAlpha.900" />
      <Container>
        <Text fontWeight="extrabold">Username</Text>
        <Editable
          defaultValue={userProfile.username}
          onSubmit={handleUsernameSubmit}
          fontSize="lg"
          isPreviewFocusable={true}
          selectAllOnFocus={false}
        >
          <EditablePreview />
          <Input
            as={EditableInput}
            ref={username}
            bgColor="whiteAlpha.900"
            focusBorderColor="blackAlpha.900"
          />
          <EditableControls />
        </Editable>
      </Container>
      <Divider borderColor="blackAlpha.900" />
      {newEmail || newUsername ? (
        <Button onClick={updateUser}>Save changes</Button>
      ) : null}
    </VStack>
  );
}

export default UpdateProfile;
