import React from "react";
import { ArtworkCard } from "../components/profile/ArtworkCard";
import { ProfileCard } from "../components/profile/ProfileCard";
import { useGetUserProfile } from "../hooks/useGetUserProfile";

export const ProfilePage: React.FC = () => {
  const { data, isLoading, error } = useGetUserProfile();

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      <ProfileCard
        picture={data!.picture}
        firstName={data!.first_name}
        lastName={data!.last_name}
        username={data!.username}
        description={data!.description}
        projects={data!.artwork.length}
      />
      <ArtworkCard artworks={data!.artwork} />
    </>
  );
};
