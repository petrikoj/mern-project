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
  const { user, checkUserStatus, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    checkUserStatus();
    console.log("useEffect ran in Navbar.js");
  }, [user]);

  return (
    <Flex justify="space-between" p={"5"}>
      <NavLink to={"/"}>
        <Heading>playlist.</Heading>
      </NavLink>
      {user ? (
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
      ) : (
        <HStack>
          <NavLink to={"/signup"}>
            <Button>Sign up</Button>
          </NavLink>
          <Text>or</Text>
          <NavLink to={"/login"}>
            <Button>Login</Button>
          </NavLink>
        </HStack>
      )}
    </Flex>
  );
}

export default Navbar;
