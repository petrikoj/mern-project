import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

function LoadingSpinner() {
  return (
    <Center>
      <Spinner size="xl" speed="0.65s" mt="16" />
    </Center>
  );
}

export default LoadingSpinner;
