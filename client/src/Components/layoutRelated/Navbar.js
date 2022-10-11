import React, { useContext } from "react";
import { HamburgerIcon, InfoIcon, PlusSquareIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <Flex justify="space-between" p={"5"}>
      <Heading>playlist.</Heading>
      {user ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="ghost"
          />
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem icon={<PlusSquareIcon />}>Create Playlist</MenuItem>
            <MenuItem>Something</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button>Sign up</Button>
      )}
    </Flex>
  );
}

export default Navbar;
