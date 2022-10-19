import React from "react";
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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/layoutRelated/Spinner.js";
import { ErrorAlert } from "../components/layoutRelated/Alerts.js";

function DetailView() {
  const { _id } = useParams();
  const { playlist, error, loading } = useFetchPlaylistById(_id);
  console.log(playlist);
  return (
    <Center>
      <VStack>
        {loading && <LoadingSpinner />}
        {error && <ErrorAlert message={error.message} />}
        {playlist && (
          <>
            <Heading>{playlist.title}</Heading>
            <Image
              src={playlist.img_url}
              alt="playlist picture"
              boxSize={["max-content", "lg"]}
              borderRadius="lg"
            />
            <Tag>{playlist.mood}</Tag>
            <Text>{playlist.description}</Text>
            <Box borderRadius="md" bg="red.100">
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
                      <Tbody>
                        <Tr key={index}>
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
