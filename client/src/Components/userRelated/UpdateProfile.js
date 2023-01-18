import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import useGetMeToken from "../../hooks/useGetMeToken";
import { baseURL } from "../../utils/getServerUrl";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
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
  VStack,
} from "@chakra-ui/react";

function UpdateProfile() {
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const { _id } = useParams();
  const { getMyToken } = useGetMeToken();
  const email = useRef();
  const username = useRef();
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleSubmit = () => {
    setNewEmail(email.current.value);
    setNewUsername(username.current.value);
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
        const toBeUpdated = JSON.stringify({
          ...userProfile,
          email: newEmail,
          username: newUsername,
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
          onSubmit={handleSubmit}
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
          onSubmit={handleSubmit}
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
      <Button onClick={updateUser}>Save changes</Button>
    </VStack>
  );
}

export default UpdateProfile;
