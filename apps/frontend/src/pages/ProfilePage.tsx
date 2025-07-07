import React, { useEffect, useState } from "react";
import { ProfileCard } from "../components/profile/ProfileCard";
import { ArtworkCard, type Artwork } from "../components/profile/ArtworkCard";
type UserProfile = {
  picture: string;
  first_name: string;
  last_name: string;
  username: string;
  description: string;
  artwork: Artwork[];
};
export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/artist/profile", { credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);
  if (user == null) return <div>Loading</div>;
  console.log(user.artwork);

  return (
    <body>
      <ProfileCard
        picture={user.picture}
        firstName={user.first_name}
        lastName={user.last_name}
        username={user.username}
        description={user.description}
        projects={user.artwork.length}
      />
      <ArtworkCard artworks={user.artwork} />
    </body>
  );
};
