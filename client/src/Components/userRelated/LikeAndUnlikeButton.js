import { AuthContext } from "../../context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useFetchUser } from "./FetchPlaylists";
import { PlaylistContext } from "../../context/PlaylistContext";

const LikeAndUnlikeButton = ({ user_id, playlist_id }) => {
  const { userProfile, setUserProfile, user } = useContext(AuthContext);
  const { myPlaylists } = useContext(PlaylistContext);

  const [isLiked, setIsLiked] = useState(false);

  const toast = useToast();

  const likeOrUnlikePlaylist = async () => {
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
        "http://localhost:5000/api/users/likehandling",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setIsLiked(!isLiked);
      toast({
        title: `${result.message}`,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="unstyled" size="lg" onClick={likeOrUnlikePlaylist}>
        <Icon as={!isLiked ? BsBookmarkHeart : BsBookmarkHeartFill} />
      </Button>
    </>
  );
};

export default LikeAndUnlikeButton;
