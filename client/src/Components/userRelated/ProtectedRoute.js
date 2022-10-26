import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  VStack,
} from "@chakra-ui/react";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const redirect = useNavigate();
  const handleGoToLogin = () => {
    redirect("/login");
  };
  const handleGoBack = () => {
    redirect(-1);
  };

  return (
    <>
      {user ? (
        children
      ) : (
        <Alert status="error" p="3">
          <VStack>
            <AlertIcon />
            <AlertTitle>Login required</AlertTitle>
            <AlertDescription>
              You need to be logged in to access this area.
            </AlertDescription>
            <Button onClick={handleGoToLogin}>Login</Button>
            <Button onClick={handleGoBack}>Go back</Button>
          </VStack>
        </Alert>
      )}
    </>
  );
}

export default ProtectedRoute;
