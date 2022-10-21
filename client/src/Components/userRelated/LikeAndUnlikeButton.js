import { AuthContext } from "../../context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useFetchPlaylists } from "./FetchPlaylists";

const LikeAndUnlikeButton = ({ user_id, playlist_id }) => {
  const { userProfile, user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  const toast = useToast();

  /*  const hasUserLikedPlaylist = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/playlists/all`);
      const playlists = await response.json();

      try {
        playlists.forEach((playlist) => {
          playlist.liked_by.forEach((like) => {
            if (like === userProfile._id) {
              setIsLiked(true);
            } else {
              setIsLiked(false);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hasUserLikedPlaylist();
  }, [user]); */

  // PUSH like to db */

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
      setIsLiked(true);
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

  // PULL like from db

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
        "http://localhost:5000/api/users/unlike",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setIsLiked(false);
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
      {!isLiked ? (
        <Button variant="unstyled" size="lg" onClick={likePlaylist}>
          <Icon as={BsBookmarkHeart} />
        </Button>
      ) : (
        <Button variant="unstyled" size="lg" onClick={unlikePlaylist}>
          <Icon as={BsBookmarkHeartFill} />
        </Button>
      )}
    </>
  );
};

export default LikeAndUnlikeButton;
