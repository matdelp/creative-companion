import type { UserProfile } from "@creative-companion/common";
import React, { useEffect, useState } from "react";
import { ArtworkCard } from "../components/profile/ArtworkCard";
import { ProfileCard } from "../components/profile/ProfileCard";

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("/api/artist/profile", { credentials: "include" })
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
  if (user == null) {
    return;
  }

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
