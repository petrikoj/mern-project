import { Center, Heading, VStack } from "@chakra-ui/react";
import Login from "../components/userRelated/Login";

function LoginView() {
  return (
    <Center>
      <VStack>
        <Heading>Login</Heading>
        <Login />
      </VStack>
    </Center>
  );
}

export default LoginView;
