import { Center, Heading, VStack } from "@chakra-ui/react";
import SignUp from "../components/userRelated/SignUp";

function SignUpView() {
  return (
    <Center>
      <VStack>
        <Heading>Sign Up</Heading>
        <SignUp />
      </VStack>
    </Center>
  );
}

export default SignUpView;
