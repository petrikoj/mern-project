import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
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
  const email = useRef();
  const username = useRef();
  /* Here's a custom control */
  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

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
    ) : null;
  }

  return (
    <VStack spacing="6">
      <Container>
        <Text fontWeight="extrabold">Email</Text>
        <Editable
          defaultValue={userProfile.email}
          ref={email}
          fontSize="lg"
          isPreviewFocusable={true}
          selectAllOnFocus={false}
        >
          <EditablePreview />
          {/* Here is the custom input */}
          <Input
            as={EditableInput}
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
          ref={username}
          fontSize="lg"
          isPreviewFocusable={true}
          selectAllOnFocus={false}
        >
          <EditablePreview />
          {/* Here is the custom input */}
          <Input
            as={EditableInput}
            bgColor="whiteAlpha.900"
            focusBorderColor="blackAlpha.900"
          />
          <EditableControls />
        </Editable>
      </Container>
      <Divider borderColor="blackAlpha.900" />
    </VStack>
  );
}

export default UpdateProfile;
