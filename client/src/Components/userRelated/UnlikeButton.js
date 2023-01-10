import { CheckIcon } from "@chakra-ui/icons";
import { IconButton, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { baseURL } from "../../utils/getServerUrl.js";
import { AuthContext } from "../../context/AuthContext";
import { PlaylistContext } from "../../context/PlaylistContext";

const UnlikeButton = ({ user_id, playlist_id }) => {
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const toast = useToast();
  const unlikePlaylist = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("user_id", user_id);
    urlencoded.append("playlist_id", playlist_id);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        baseURL + "/api/users/unlike",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      const userUpdated = result.userUpdated;
      setUserProfile(userUpdated);
      toast({
        title: `${result.message}`,
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  return (
    <IconButton
      icon={<CheckIcon />}
      sx={{ boxShadow: "1px 1px black" }}
      borderRadius="full"
      variant="outlined"
      border="2px solid black"
      bgColor="green.200"
      onClick={unlikePlaylist}
    />
  );
};

export default UnlikeButton;
