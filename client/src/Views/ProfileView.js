import { Center, Heading, VStack } from "@chakra-ui/react";
import Profile from "../components/userRelated/Profile";

function ProfileView() {
  return (
    <Center>
      <VStack>
        <Heading>Profile</Heading>
        <Profile />
      </VStack>
    </Center>
  );
}

export default ProfileView;
