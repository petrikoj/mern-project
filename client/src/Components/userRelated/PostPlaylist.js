import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
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
import { redirect, useNavigate } from "react-router-dom";

function PostPlaylist() {
  const { userProfile } = useContext(AuthContext);

  const toast = useToast();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    creator: "",
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
        "http://localhost:5000/api/playlists/image-upload",
        requestOptions
      );
      const result = await response.json();
      console.log("Result:", result);
      setNewPlaylist({ ...newPlaylist, img_url: result.img_url });
      console.log("newPlaylist :>> ", newPlaylist);
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

  // Upload (OLD!)

  /*  const submitPlaylist = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("title", newPlaylist.title);
    urlencoded.append("description", newPlaylist.description);
    // urlencoded.append("author", newPlaylist.author);
    urlencoded.append("mood", newPlaylist.mood);
    urlencoded.append("songs", newPlaylist.songs);
    urlencoded.append("image_url", newPlaylist.img_url);

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/playlists/create",
        requestOptions
      );
      const results = await response.json();
      console.log("Result:", results);
    } catch (error) {
      console.log("Fetch error", error);
    }
  }; */

  // Send input data with JSON stringify

  const uploadPlaylist = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const myPlaylist = JSON.stringify({
      title: newPlaylist.title,
      creator: userProfile._id,
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
        "http://localhost:5000/api/playlists/create",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      toast({
        title: `${result.message}`,
        status: "info",
        variant: "subtle",
        duration: 1500,
        isClosable: true,
      });
      redirect("/playlists/all");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <FormControl isRequired={true}>
        <FormLabel>Playlist Picture</FormLabel>
        <Input type="file" name="image" onChange={attachFileHandler} />
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
        {/* <FormLabel>Author</FormLabel>
        <Input
          name="author"
          type="text"
          // value={newPlaylist.author ? newPlaylist.author : ""}
          value={userProfile.username}
          isReadOnly={true}
          onChange={handleChangeHandler}
        /> */}
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
                  <Input
                    name="album"
                    type="text"
                    placeholder="Album"
                    value={single.album ? single.album : ""}
                    onChange={(e) => handleSongInputHandler(e, i)}
                  />
                  {/* <Input placeholder="Release Year" /> */}
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
      <Button onClick={uploadPlaylist}>Submit</Button>
    </>
  );
}

export default PostPlaylist;
