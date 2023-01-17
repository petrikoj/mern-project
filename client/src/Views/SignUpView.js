import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Center,
  Divider,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import SignUp from "../components/userRelated/SignUp";
import useGuestLogin from "../hooks/useGuestLogin";

function SignUpView() {
  const { handleLogin } = useGuestLogin();
  return (
    <Center>
      <VStack spacing="6">
        <Heading>Continue as guest</Heading>
        <IconButton
          icon={<ArrowForwardIcon boxSize="6" />}
          w="40"
          onClick={handleLogin}
        />
        <HStack px="12" w="full">
          <Divider borderColor="blackAlpha.900" />
          <Text fontSize={["lg", "2xl"]} fontWeight="medium">
            or
          </Text>
          <Divider borderColor="blackAlpha.900" />
        </HStack>

        <Heading>Create an account</Heading>
        <SignUp />
      </VStack>
    </Center>
  );
}

export default SignUpView;
