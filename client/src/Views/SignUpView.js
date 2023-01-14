import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Center, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import SignUp from "../components/userRelated/SignUp";
import useGuestLogin from "../hooks/useGuestLogin";

function SignUpView() {
  const { handleLogin } = useGuestLogin();
  return (
    <Center>
      <VStack>
        <Heading>Sign in as guest</Heading>
        <IconButton
          icon={<ArrowForwardIcon boxSize="6" />}
          w="40"
          onClick={handleLogin}
        />
        <Text>or</Text>
        <Heading>Create an account</Heading>
        <SignUp />
      </VStack>
    </Center>
  );
}

export default SignUpView;
