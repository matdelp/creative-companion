import React, { useEffect, useState } from "react";

import type { UserProfile } from "@creative-companion/common";
import { ArtworkCard } from "../components/profile/ArtworkCard";
import { ProfileCard } from "../components/profile/ProfileCard";
import { useNavigate } from "react-router-dom";

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
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
  if (user == null) {
    navigate("/");
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
