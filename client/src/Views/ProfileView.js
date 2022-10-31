import {
  Badge,
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { TbPlaylist } from "react-icons/tb";
import { HiHeart } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useFetchUser } from "../components/userRelated/FetchPlaylists";
import LoadingSpinner from "../components/layoutRelated/Spinner";
//import LikeAndUnlikeButton from "../components/userRelated/LikeAndUnlikeButton";
import UnlikeButton from "../components/userRelated/UnlikeButton";
import LikeButton from "../components/userRelated/LikeButton";
import { PlaylistContext } from "../context/PlaylistContext";
import { DeleteIcon } from "@chakra-ui/icons";

function ProfileView() {
  const { _id } = useParams();
  const { deletePlaylist } = useContext(PlaylistContext);
  const { myUser, error, loading } = useFetchUser(_id);
  console.log("Result of useFetchUser:", myUser);

  return (
    <>
      {loading && <LoadingSpinner />}
      {myUser && (
        <Center overflowX="hidden">
          <VStack>
            <Divider borderColor="blackAlpha.900" />
            <Heading>{myUser.username}'s Profile</Heading>

            <Tabs
              isFitted
              isLazy
              size={["md", "lg"]}
              variant="soft-rounded"
              colorScheme="gray"
            >
              <TabList m="3">
                <Tab>
                  <VStack>
                    <Icon as={TbPlaylist} />
                    <Text>Playlists</Text>
                  </VStack>
                </Tab>
                <Tab>
                  <VStack>
                    <Icon as={HiHeart} />
                    <Text>Favorites</Text>
                  </VStack>
                </Tab>
                <Tab>
                  <VStack>
                    <Icon as={IoMdSettings} />
                    <Text>Settings</Text>
                  </VStack>
                </Tab>
              </TabList>
              <Divider borderColor="blackAlpha.900" />
              <TabPanels>
                <TabPanel overflowY="auto">
                  <>
                    {myUser.playlists?.map((list, index) => {
                      return (
                        <HStack>
                          <Box
                            key={index}
                            border="1px"
                            borderRadius="md"
                            p="1.5"
                            m="1"
                            w={["64", "xl", "2xl"]}
                            h="auto"
                          >
                            <Link to={`/playlists/${list._id}`}>
                              <HStack>
                                <Image
                                  src={list.img_url}
                                  borderRadius="md"
                                  boxSize="16"
                                />
                                <VStack align="start">
                                  <Text as="b">{list.title}</Text>
                                  <Badge>{list.songs.length} songs</Badge>
                                </VStack>
                              </HStack>
                            </Link>
                          </Box>
                          <IconButton
                            icon={<DeleteIcon />}
                            variant="unstyled"
                            size="sm"
                            onClick={deletePlaylist}
                            value={list._id}
                          />
                        </HStack>
                      );
                    })}
                  </>
                </TabPanel>
                <TabPanel overflowY="auto">
                  {myUser.liked?.map((list, index) => {
                    return (
                      <HStack>
                        <Box
                          key={index}
                          border="1px"
                          borderRadius="md"
                          p="1.5"
                          m="1"
                          w={["64", "xl", "2xl"]}
                          h="auto"
                        >
                          <Link to={`/playlists/${list._id}`}>
                            <HStack>
                              <Image
                                src={list.img_url}
                                borderRadius="md"
                                boxSize="16"
                              />
                              <VStack align="start">
                                <Text as="b">{list.title}</Text>
                                <Badge>{list.songs.length} songs</Badge>
                              </VStack>
                            </HStack>
                          </Link>
                        </Box>
                        {list.liked_by?.includes(myUser._id) ? (
                          <UnlikeButton
                            user_id={myUser._id}
                            playlist_id={list._id}
                          />
                        ) : (
                          <LikeButton
                            user_id={myUser._id}
                            playlist_id={list._id}
                          />
                        )}
                      </HStack>
                    );
                  })}
                </TabPanel>
                <TabPanel>
                  <p>Settings ...</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Center>
      )}
    </>
  );
}

export default ProfileView;
