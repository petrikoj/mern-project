import React, { useContext, useEffect } from "react";
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
    <Box position="sticky" top="0" width="100%" mb="2">
      {user ? (
        <Flex justify="space-between" align="center" p="5">
          <Image src={userProfile.avatar} boxSize="8" borderRadius="full" />
          <NavLink to={"/"}>
            <Heading>playlist.</Heading>
          </NavLink>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="ghost"
            />
            <MenuList>
              <NavLink to={"/profile"}>
                <MenuItem>
                  <Icon as={BiUser} mr="2" />
                  Profile
                </MenuItem>
              </NavLink>
              <NavLink to={"/create-playlist"}>
                <MenuItem>
                  <Icon as={MdOutlinePlaylistAdd} mr="2" />
                  Create Playlist
                </MenuItem>
              </NavLink>
              {/* <MenuItem>Something</MenuItem> */}
              <MenuItem onClick={logoutUser}>
                <Icon as={MdLogout} mr="2" />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      ) : (
        <Flex justify="space-between" align="center" p={"5"}>
          <NavLink to={"/"}>
            <Heading>playlist.</Heading>
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
