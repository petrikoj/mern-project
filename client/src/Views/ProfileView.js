import {
  Badge,
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TbPlaylist } from "react-icons/tb";
import { HiHeart } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useFetchUser } from "../components/userRelated/FetchPlaylists";

function ProfileView() {
  const { userProfile, setUserProfile, getUserProfile } =
    useContext(AuthContext);
  console.log(userProfile.playlists);
  const { _id } = useParams();
  const { myUser, error, loading } = useFetchUser(_id);
  console.log("Result of useFetchUser:", myUser);

  return (
    <Center>
      <VStack>
        <Divider />
        <Heading>{myUser.username}'s Profile</Heading>
        <Tabs
          isFitted
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
          <Divider />
          <TabPanels>
            <TabPanel>
              <>
                {myUser.playlists?.map((list, index) => {
                  return (
                    <Box
                      key={index}
                      border="1px"
                      borderRadius="md"
                      p="1.5"
                      m="1"
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
                  );
                })}
              </>
            </TabPanel>
            <TabPanel>
              {myUser.liked?.map((list, index) => {
                return (
                  <Box key={index} border="1px" borderRadius="md" p="1.5" m="1">
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
  );
}

export default ProfileView;
