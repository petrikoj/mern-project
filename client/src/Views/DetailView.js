import React, { useContext, useState } from "react";
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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/layoutRelated/Spinner.js";
import { ErrorAlert } from "../components/layoutRelated/Alerts.js";
import { AuthContext } from "../context/AuthContext.js";
import UnlikeButton from "../components/userRelated/UnlikeButton.js";
import LikeButton from "../components/userRelated/LikeButton.js";
import { PlaylistContext } from "../context/PlaylistContext.js";
/* import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext.js"; */

function DetailView() {
  const { _id } = useParams();
  const { playlist, error, loading } = useFetchPlaylistById(_id);
  const { userProfile, user } = useContext(AuthContext);

  const [likeCount, setLikeCount] = useState(null);

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
            <Flex align="center">
              <Box mr="-1.5" mb="1.5">
                <Text fontSize="lg" fontWeight="semibold">
                  {playlist.liked_by?.length}
                </Text>
              </Box>
              {playlist.liked_by?.includes(userProfile._id) ? (
                <UnlikeButton
                  playlist_id={playlist._id}
                  user_id={userProfile._id}
                />
              ) : (
                <LikeButton
                  playlist_id={playlist._id}
                  user_id={userProfile._id}
                />
              )}
            </Flex>

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
          </>
        )}
      </VStack>
    </Center>
  );
}

export default DetailView;
