import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { Button, Icon, IconButton, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { BsBookmarkHeart } from "react-icons/bs";
import { baseURL } from "../../utils/getServerUrl.js";
import { AuthContext } from "../../context/AuthContext";

const LikeButton = ({ user_id, playlist_id }) => {
  const { setUserProfile } = useContext(AuthContext);
  const toast = useToast();

  const likePlaylist = async () => {
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
      const response = await fetch(baseURL + "/api/users/like", requestOptions);
      const result = await response.json();
      console.log(result);
      const updatedProfile = result.userUpdated;
      setUserProfile(updatedProfile);
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
      icon={<AddIcon />}
      sx={{ boxShadow: "1px 1px black" }}
      borderRadius="full"
      variant="outlined"
      border="2px solid black"
      bgColor="gray.200"
      onClick={likePlaylist}
    />
  );
};

export default LikeButton;
