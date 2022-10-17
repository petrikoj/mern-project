import React from "react";
import useFetch from "../../hooks/useFetch.js";
import {
  Box,
  HStack,
  Image as Cover,
  SimpleGrid,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Tr,
  Text,
  Thead,
  Th,
  Center,
  Badge,
  TagLabel,
} from "@chakra-ui/react";
import LoadingSpinner from "../layoutRelated/Spinner.js";

const FetchPlaylists = () => {
  const {
    data: playlists,
    error,
    loading,
  } = useFetch("http://localhost:5000/api/playlists/all");
  console.log(playlists);
  return (
    <Box overflowX="hidden" overflowY="auto">
      <SimpleGrid columns={[2, 4]} spacing="10">
        {playlists &&
          playlists.map((list, _id) => {
            return (
              <Box key={_id}>
                <Center>
                  <Cover
                    boxSize="36"
                    src="https://freepngstock.com/assets/img/uploads/owl-ga52a8029e_640.png"
                  />
                </Center>
                <Center>
                  <Text as="b">{list.title}</Text>
                </Center>

                <Tag>
                  <TagLabel>{list.author}</TagLabel>
                </Tag>
                <Badge>{list.songs.length} songs</Badge>
                <Tag>{list.mood}</Tag>
                <Text>{list.description}</Text>

                {/* <Box borderRadius="md" bg="red.100">
                  <TableContainer>
                    <Table variant="unstyled">
                      <Thead>
                        <Tr>
                          <Th>Artist</Th>
                          <Th>Title</Th>
                        </Tr>
                      </Thead>

                      {list.songs.map((song, index) => {
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
                </Box> */}
              </Box>
            );
          })}
        {loading && <LoadingSpinner />}
        {error && <p>error</p>}
      </SimpleGrid>
    </Box>
  );
};

const useFetchPlaylistById = (id) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const {
    data: playlist,
    error,
    loading,
  } = useFetch(`http://localhost:5000/api/playlists/${id}`, requestOptions);
  return { playlist, error, loading };
};

export { FetchPlaylists, useFetchPlaylistById };
