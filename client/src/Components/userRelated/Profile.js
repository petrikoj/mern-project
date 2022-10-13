import { Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          requestOptions
        );

        const result = await response.json();
        setUserProfile({
          email: result.email,
          username: result.username,
          avatar: result.avatar,
        });
      } catch (error) {
        console.log("Error accessing user's profile", error);
      }
    } else {
      setError(true);
      console.log("No token for this user");
    }
  };
  console.log("Profile:", userProfile);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {userProfile && (
        <>
          <Image
            src={userProfile.avatar}
            alt={userProfile.username}
            boxSize="24"
          />
          <Text>Welcome {userProfile.username}</Text>
        </>
      )}
    </>
  );
}

export default Profile;
