import React from "react";
import { ProfileCard } from "../components/profile/ProfileCard";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import { ArtworkCard } from "../components/profile/ArtworkCard";

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
      <ProfileCard data={data!} />
      <ArtworkCard
        artworks={data!.artwork}
        background="dark:bg-mybackground-dark-100"
        isDashboard={false}
      />
    </>
  );
};
