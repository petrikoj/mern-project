import React, { useContext, useRef, useState } from "react";
import { useFetchPlaylistById } from "../components/userRelated/FetchPlaylists.js";
import {
  Box,
  Center,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Th,
  Td,
  Thead,
  Tr,
  VStack,
  Text,
  Tag,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
  HStack,
  Flex,
  IconButton,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { ChatIcon, EditIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/layoutRelated/Spinner.js";
import { ErrorAlert } from "../components/layoutRelated/Alerts.js";
import { AuthContext } from "../context/AuthContext.js";
import UnlikeButton from "../components/userRelated/UnlikeButton.js";
import LikeButton from "../components/userRelated/LikeButton.js";
import { PlaylistContext } from "../context/PlaylistContext.js";
import CommentSection from "../components/userRelated/CommentSection.js";
import LikeAndUnlikeButton from "../components/userRelated/LikeAndUnlikeButton.js";
/* import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext.js"; */

function DetailView() {
  const { _id } = useParams();
  //const myCommentSection = useRef(null);
  const { playlist, error, loading } = useFetchPlaylistById(_id);
  const { userProfile, user } = useContext(AuthContext);

  const [likeCount, setLikeCount] = useState(null);

  /* const scrollToComments = () => {
    window.scrollTo({
      top: myCommentSection.current.offsetTop,
      behavior: "smooth",
    });
  }; */

  // Not Working with PlaylistContext =/
  return (
    <Center overflowY="scroll" m="2" w="auto" h="auto">
      <VStack>
        {loading && <LoadingSpinner />}
        {error && <ErrorAlert message={error.message} />}
        {playlist && (
          <>
            <Heading>{playlist.title}</Heading>
            <Image
              src={playlist.img_url}
              alt="playlist picture"
              boxSize={["fit-content", "lg"]}
              borderRadius="lg"
            />
            <Divider borderColor="blackAlpha.900" />
            <Tag>{playlist.mood}</Tag>

            <Text>{playlist.description}</Text>
            <Divider borderColor="blackAlpha.900" />

            <ButtonGroup spacing={["4", "8"]} variant="ghost" size="lg">
              {playlist.creator?._id === userProfile._id && (
                <IconButton icon={<EditIcon />} />
              )}
              <Button leftIcon={<ChatIcon />}>
                <Text fontSize="md" fontWeight="semibold">
                  {playlist.comments?.length}
                </Text>
              </Button>
              <HStack>
                <LikeAndUnlikeButton
                  playlist_id={playlist._id}
                  user_id={userProfile._id}
                />
                {/* {playlist.liked_by?.includes(userProfile._id) ? (
                  <UnlikeButton
                    playlist_id={playlist._id}
                    user_id={userProfile._id}
                  />
                ) : (
                  <LikeButton
                    playlist_id={playlist._id}
                    user_id={userProfile._id}
                  />
                )} */}
                <Text fontSize="md" fontWeight="semibold">
                  {playlist.liked_by?.length}
                </Text>
              </HStack>
            </ButtonGroup>

            <Box borderRadius="md" bg="red.100" w="xs" overflowY="scroll">
              <TableContainer>
                <Table variant="unstyled">
                  <Thead>
                    <Tr>
                      <Th>Artist</Th>
                      <Th>Title</Th>
                    </Tr>
                  </Thead>
                  {playlist.songs?.map((song, index) => {
                    return (
                      <Tbody key={index}>
                        <Tr>
                          <Td>{song.artist}</Td>
                          <Td>"{song.song_title}"</Td>
                        </Tr>
                      </Tbody>
                    );
                  })}
                </Table>
              </TableContainer>
            </Box>
            <Divider borderColor="blackAlpha.900" />
            <CommentSection playlist={playlist} />
          </>
        )}
      </VStack>
    </Center>
  );
}

export default DetailView;
