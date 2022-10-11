import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function PostPlaylist() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState({});
  const [image_url, setImage_url] = useState("");

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
      setNewPlaylist({ ...newPlaylist, image_url: result.image_url });
    } catch (error) {}
  };

  // Send input data

  const handleChangeHandler = (event) => {
    setNewPlaylist({ ...newPlaylist, [event.target.name]: event.target.value });
  };

  const submitPlaylist = async () => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("title", newPlaylist.title);
    urlencoded.append("description", newPlaylist.description);
    // urlencoded.append("author", newPlaylist.author);
    urlencoded.append("mood", newPlaylist.mood);
    urlencoded.append("songs", newPlaylist.songs);
    urlencoded.append("image_url", newPlaylist.image_url);

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
  };

  return (
    <>
      <FormControl isRequired={true}>
        <FormLabel>Playlist Picture</FormLabel>
        <Input type="file" name="image" onChange={attachFileHandler} />
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
        <FormLabel>Author</FormLabel>
        <Input
          name="author"
          type="text"
          value={newPlaylist.author ? newPlaylist.author : ""}
          isReadOnly={false}
          onChange={handleChangeHandler}
        ></Input>
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
        <Stack direction="row">
          <Input
            name="artist"
            type="text"
            placeholder="Artist"
            /*  value={
              newPlaylist.songs.single.artist
                ? newPlaylist.songs.single.artist
                : ""
            } */
            onChange={handleChangeHandler}
          />
          <Input
            name="song_title"
            type="text"
            placeholder="Song Title"
            /* value={
              newPlaylist.songs.single.song_title
                ? newPlaylist.songs.single.song_title
                : ""
            } */
            onChange={handleChangeHandler}
          />
          <Input
            name="album"
            type="text"
            placeholder="Album"
            /*  value={
              newPlaylist.songs.single.album
                ? newPlaylist.songs.single.album
                : ""
            } */
            onChange={handleChangeHandler}
          />
          {/* <Input placeholder="Release Year" /> */}
        </Stack>
        <Stack direction="row">
          <Input
            name="artist"
            type="text"
            placeholder="Artist"
            onChange={handleChangeHandler}
          />
          <Input
            name="song_title"
            type="text"
            placeholder="Song Title"
            onChange={handleChangeHandler}
          />
          <Input
            name="album"
            type="text"
            placeholder="Album"
            onChange={handleChangeHandler}
          />
          {/* <Input placeholder="Release Year" /> */}
        </Stack>
        <Stack direction="row">
          <Input
            name="artist"
            type="text"
            placeholder="Artist"
            onChange={handleChangeHandler}
          />
          <Input
            name="song_title"
            type="text"
            placeholder="Song Title"
            onChange={handleChangeHandler}
          />
          <Input
            name="album"
            type="text"
            placeholder="Album"
            onChange={handleChangeHandler}
          />
          {/* <Input placeholder="Release Year" /> */}
        </Stack>
        <IconButton icon={<AddIcon />} />
      </FormControl>
      <Button onClick={submitPlaylist}>Submit</Button>
    </>
  );
}

export default PostPlaylist;
