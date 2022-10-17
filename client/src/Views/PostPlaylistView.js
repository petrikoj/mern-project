import PostPlaylist from "../components/userRelated/PostPlaylist";
import { Center, Heading, VStack } from "@chakra-ui/react";

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
