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
  return (
    <>
      <button onClick={getProfile}>Profile</button>
      {userProfile && (
        <div>
          <p>{userProfile.username}</p>
          <p>{userProfile.email}</p>
          <img src={userProfile.avatar} alt={userProfile.username} />
        </div>
      )}
    </>
  );
}

export default Profile;
