import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import getToken from "../../utils/getToken";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/getServerUrl.js";
import { PlaylistContext } from "../../context/PlaylistContext";

function PostPlaylist() {
  const { userProfile } = useContext(AuthContext);
  const { getAllPlaylists, myPlaylists, setMyPlaylists } =
    useContext(PlaylistContext);
  const toast = useToast();
  const redirect = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    creator: "",
    //creatorName: "",
    //creatorAvatar: "",
    description: "",
    img_url: "",
    mood: "",
    songs: [
      {
        single: {
          artist: "",
          song_title: "",
          album: "",
        },
      },
    ],
    date: null,
    liked_by: [],
  });
  const [songArray, setSongArray] = useState([
    { artist: "", song_title: "", album: "" },
    { artist: "", song_title: "", album: "" },
    { artist: "", song_title: "", album: "" },
  ]);
  // const [cloudinaryUrl, setCloudinaryUrl] = useState("");

  // Upload playlist picture

  const attachFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    console.log("selectedFile:", selectedFile);
    console.log("formData:", formData);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(
        baseURL + "/api/playlists/image-upload",
        requestOptions
      );
      const result = await response.json();
      console.log("Result:", result);
      setNewPlaylist({ ...newPlaylist, img_url: result.img_url });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // Control input data

  const handleChangeHandler = (event) => {
    setNewPlaylist({ ...newPlaylist, [event.target.name]: event.target.value });
  };

  const handleSongInputHandler = (event, index) => {
    const { name, value } = event.target;
    const mySongs = [...songArray];
    mySongs[index][name] = value;
    setSongArray(mySongs);
  };

  const handleAddSongInputField = () => {
    setSongArray([...songArray, { artist: "", song_title: "", album: "" }]);
  };

  const handleRemoveSongInputField = () => {
    const mySongs = [...songArray];
    mySongs.pop();
    // mySongs.splice(index, 1);
    setSongArray(mySongs);
  };

  // Send input data with JSON stringify

  const uploadPlaylist = async (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const myPlaylist = JSON.stringify({
      title: newPlaylist.title,
      creator: userProfile._id,
      //creatorName: userProfile.username,
      //creatorAvatar: userProfile.avatar,
      description: newPlaylist.description,
      img_url: newPlaylist.img_url,
      mood: newPlaylist.mood,
      songs: songArray,
      date: Date.now(),
      // date still to be updated to given timezone
      liked_by: [],
      comments: [],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: myPlaylist,
    };
    console.log("requestOptions", requestOptions);

    try {
      const response = await fetch(
        baseURL + "/api/playlists/create",
        requestOptions
      );
      const result = await response.json();
      toast({
        title: `${result.message}`,
        status: "info",
        variant: "subtle",
        duration: 1500,
        isClosable: true,
      });
      setMyPlaylists([...myPlaylists, result.newPlaylist]);
      redirect("/playlists/all", { replace: true });
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        variant: "subtle",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Container>
        <FormControl isRequired={true}>
          <FormLabel>Playlist Picture</FormLabel>
          <Input type="file" name="image" onChange={attachFileHandler} p="2" />
          {newPlaylist.img_url && (
            <Center>
              <Image
                boxSize="36"
                src={newPlaylist.img_url}
                alt="playlist picture"
              />
            </Center>
          )}
          <Button onClick={submitForm}>Upload img</Button>
          <FormLabel>Playlist Title</FormLabel>
          <Input
            name="title"
            type="text"
            value={newPlaylist.title ? newPlaylist.title : ""}
            onChange={handleChangeHandler}
          />
          <FormLabel>Description</FormLabel>
          <Input
            name="description"
            type="text"
            value={newPlaylist.description ? newPlaylist.description : ""}
            onChange={handleChangeHandler}
          />
          <FormLabel>Mood</FormLabel>
          <Select
            name="mood"
            type="text"
            placeholder="What's the vibe?"
            value={newPlaylist.mood ? newPlaylist.mood : ""}
            onChange={handleChangeHandler}
          >
            <option>party</option>
            <option>mellow</option>
            <option>dinner</option>
            <option>workout</option>
            <option>melancholic</option>
            <option>thinking</option>
            <option>focus</option>
          </Select>
          <FormLabel>Songs</FormLabel>
          {songArray.map((single, i) => {
            return (
              <Box key={i}>
                <Stack direction="row">
                  <InputGroup name="single">
                    <Input
                      name="artist"
                      type="text"
                      placeholder="Artist"
                      value={single.artist ? single.artist : ""}
                      onChange={(e) => handleSongInputHandler(e, i)}
                    />
                    <Input
                      name="song_title"
                      type="text"
                      placeholder="Song Title"
                      value={single.song_title ? single.song_title : ""}
                      onChange={(e) => handleSongInputHandler(e, i)}
                    />
                  </InputGroup>
                </Stack>
              </Box>
            );
          })}

          <Stack direction="row">
            <Button onClick={handleAddSongInputField}>Add Song</Button>
            {songArray.length > 3 && (
              <Button onClick={handleRemoveSongInputField}>Remove song</Button>
            )}
          </Stack>
        </FormControl>
      </Container>
      <Button w={["80", "24"]} onClick={uploadPlaylist}>
        Submit
      </Button>
    </>
  );
}

export default PostPlaylist;
