import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HamburgerIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { MdLogout, MdOutlinePlaylistAdd } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user, getUserProfile, userProfile, checkUserStatus, logoutUser } =
    useContext(AuthContext);

  useEffect(() => {
    checkUserStatus();
    getUserProfile();
    console.log("useEffect ran in Navbar.js");
  }, [user]);

  return (
    <Box
      position="sticky"
      top="0"
      h="16"
      width="100%"
      p="2"
      mb="3"
      zIndex="banner"
      bg="yellow.200"
      boxSize="full"
      opacity="0.99"
      /* borderBottom="0.1rem solid"
      borderColor="blackAlpha.900" */
    >
      {user ? (
        <Flex justify="space-around" align="center" p="5">
          <Image
            src={userProfile?.avatar}
            boxSize={["10", "14"]}
            borderRadius="full"
            border="1px solid"
            borderColor="blackAlpha.900"
          />
          <NavLink to={"/"}>
            <Heading>playlist.</Heading>
          </NavLink>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="ghost"
              fontSize={["lg", "x-large", "2xl"]}
              sx={{
                boxShadow: "0",
              }}
              _hover={{
                border: "2px solid",
                borderColor: "blackAlpha.900",
                boxShadow: "2px 2px black",
              }}
              _active={{
                bgColor: "blue.200",
                border: "2px solid",
                borderColor: "blackAlpha.900",
                boxShadow: "2px 2px black",
              }}
            />
            <MenuList
              boxShadow="5px 5px black"
              borderRadius="base"
              border="2px solid"
              borderColor="blackAlpha.900"
            >
              <NavLink to={`/profile/${userProfile?._id}`}>
                <MenuItem _hover={{ bgColor: "blue.200" }}>
                  <Icon as={BiUser} mr="2" />
                  Profile
                </MenuItem>
              </NavLink>
              <NavLink to={"/create-playlist"}>
                <MenuItem _hover={{ bgColor: "blue.200" }}>
                  <Icon as={MdOutlinePlaylistAdd} mr="2" />
                  Create Playlist
                </MenuItem>
              </NavLink>
              <MenuItem _hover={{ bgColor: "blue.200" }} onClick={logoutUser}>
                <Icon as={MdLogout} mr="2" />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      ) : (
        <Flex justify="space-around" align="center" p={"3"}>
          <NavLink to={"/"}>
            <Heading fontFamily="monospace" fontSize={["lg", "2xl", "4xl"]}>
              playlist.
            </Heading>
          </NavLink>
          <HStack>
            <NavLink to={"/signup"}>
              <Button>Sign up</Button>
            </NavLink>
            <Text>or</Text>
            <NavLink to={"/login"}>
              <Button>Login</Button>
            </NavLink>
          </HStack>
        </Flex>
      )}
    </Box>
  );
}

export default Navbar;
