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
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { TbPlaylist } from "react-icons/tb";
import { HiHeart } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/layoutRelated/Spinner";
//import LikeAndUnlikeButton from "../components/userRelated/LikeAndUnlikeButton";
import UnlikeButton from "../components/userRelated/UnlikeButton";
import { PlaylistContext } from "../context/PlaylistContext";
import { DeleteIcon } from "@chakra-ui/icons";

function ProfileView() {
  const { _id } = useParams();
  const { deletePlaylist } = useContext(PlaylistContext);
  const { userProfile, setUserProfile, loading, getUserById } =
    useContext(AuthContext);

  useEffect(() => {
    getUserById(_id);
  }, [_id]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {userProfile && (
        <Center overflowX="hidden">
          <VStack>
            <Heading>{userProfile.username}'s Profile</Heading>
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
              </TabList>
              <Divider borderColor="blackAlpha.900" />
              <TabPanels>
                <TabPanel overflowY="auto">
                  <>
                    {userProfile.playlists?.map((list) => {
                      return (
                        <HStack key={list._id}>
                          <Box
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
                                  <Badge>{list.songs?.length} songs</Badge>
                                </VStack>
                              </HStack>
                            </Link>
                          </Box>
                          <IconButton
                            icon={<DeleteIcon />}
                            sx={{ bgColor: "red.300" }}
                            onClick={deletePlaylist}
                            value={list._id}
                          />
                        </HStack>
                      );
                    })}
                  </>
                </TabPanel>
                <TabPanel overflowY="auto">
                  {userProfile.liked?.map((list) => {
                    return (
                      <HStack key={list._id}>
                        <Box
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
                                <Badge>{list.songs?.length} songs</Badge>
                              </VStack>
                            </HStack>
                          </Link>
                        </Box>
                        <UnlikeButton
                          user_id={userProfile._id}
                          playlist_id={list._id}
                        />
                      </HStack>
                    );
                  })}
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
