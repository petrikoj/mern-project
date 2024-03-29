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
import { GrUserSettings } from "react-icons/gr";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/layoutRelated/Spinner";
//import LikeAndUnlikeButton from "../components/userRelated/LikeAndUnlikeButton";
import UnlikeButton from "../components/userRelated/UnlikeButton";
import { PlaylistContext } from "../context/PlaylistContext";
import { DeleteIcon } from "@chakra-ui/icons";
import { guestUserId } from "../utils/configs";
import UpdateProfile from "../components/userRelated/UpdateProfile";

function ProfileView() {
  const { _id } = useParams();
  const { deletePlaylist } = useContext(PlaylistContext);
  const { userProfile, loading, getUserById } = useContext(AuthContext);

  useEffect(() => {
    getUserById();
  }, [_id]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {userProfile && (
        <Center overflowX="hidden">
          <VStack>
            <Heading>{userProfile.username}</Heading>

            <Tabs
              align="center"
              isFitted
              isLazy
              size={["md", "lg"]}
              variant="unstyled"
            >
              <Divider borderColor="blackAlpha.900" />
              <TabList>
                <Tab
                  _selected={{
                    bg: "yellow.200",
                    borderLeft: "1px",
                    borderRight: "1px",
                    borderColor: "blackAlpha.900",
                  }}
                >
                  <VStack pt="2">
                    <Icon as={TbPlaylist} />
                    <Text>Playlists</Text>
                  </VStack>
                </Tab>
                <Tab
                  _selected={{
                    bg: "yellow.200",
                    borderLeft: "1px",
                    borderRight: "1px",
                    borderColor: "blackAlpha.900",
                  }}
                >
                  <VStack pt="2">
                    <Icon as={HiHeart} />
                    <Text>Favorites</Text>
                  </VStack>
                </Tab>
                {/* {userProfile._id === guestUserId ? null : ( */}
                <Tab
                  _selected={{
                    bg: "yellow.200",
                    borderLeft: "1px",
                    borderRight: "1px",
                    borderColor: "blackAlpha.900",
                  }}
                >
                  <VStack pt="2">
                    <Icon as={GrUserSettings} />
                    <Text>Account</Text>
                  </VStack>
                </Tab>
                {/*  )} */}
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
                            borderColor="blackAlpha.900"
                            borderRadius="base"
                            p="1.5"
                            m="1"
                            w={["64", "xl", "2xl"]}
                            h="auto"
                            //bgColor="whiteAlpha.900"
                          >
                            <Link to={`/playlists/${list._id}`}>
                              <HStack>
                                <Image
                                  src={list.img_url}
                                  borderRadius="base"
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
                {userProfile._id === guestUserId ? (
                  <TabPanel>
                    <VStack spacing="2">
                      <Text>
                        Users other than the guest user account can change their
                        profile data here.
                      </Text>
                      <Text>Want to see it working?</Text>
                      <Link to="/signup">
                        <Text as="u">Just create an account this time.</Text>
                      </Link>
                    </VStack>
                  </TabPanel>
                ) : (
                  <TabPanel>
                    <UpdateProfile />
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </VStack>
        </Center>
      )}
    </>
  );
}

export default ProfileView;
