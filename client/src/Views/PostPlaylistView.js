import { Center, Heading, VStack } from "@chakra-ui/react";
import PostPlaylist from "../components/userRelated/PostPlaylist";

function PostPlaylistView() {
  return (
    <Center>
      <VStack>
        <Heading>Create a Playlist</Heading>
        <PostPlaylist />
      </VStack>
    </Center>
  );
}

export default PostPlaylistView;
