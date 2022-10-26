import { AddIcon } from "@chakra-ui/icons";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { BsBookmarkHeart } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";
import { PlaylistContext } from "../../context/PlaylistContext";

const LikeButton = ({ user_id, playlist_id }) => {
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
      const response = await fetch(
        "http://localhost:5000/api/users/like",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
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
    <Button
      leftIcon={<BsBookmarkHeart />}
      variant="unstyled"
      onClick={likePlaylist}
      mr="-3.5"
    />
  );
};

export default LikeButton;
