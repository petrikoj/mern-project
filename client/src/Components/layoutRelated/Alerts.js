import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const SuccessAlert = ({ message }) => {
  return (
    <Alert status="success">
      <AlertIcon />
      {message}
    </Alert>
  );
};

export { SuccessAlert };
