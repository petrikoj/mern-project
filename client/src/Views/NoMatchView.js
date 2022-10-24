import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Center, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { TbError404 } from "react-icons/tb";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

function NoMatchView() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Center>
      <VStack>
        <Icon as={TbError404} boxSize="44" color="blackAlpha.900" />
        {/* <Heading>404</Heading> */}
        <Text as="b">This page doesn't exist.</Text>
        <IconButton
          leftIcon={<ArrowLeftIcon />}
          onClick={handleGoBack}
          size="lg"
          p="2"
        >
          <Text>Back</Text>
        </IconButton>
        <Text>or</Text>
        <Link to={"/"}>
          <IconButton rightIcon={<ArrowRightIcon />} size="lg" p="2">
            <Text>Home</Text>
          </IconButton>
        </Link>
      </VStack>
    </Center>
  );
}

export default NoMatchView;
