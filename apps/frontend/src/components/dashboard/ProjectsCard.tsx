import React from "react";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { ArtworkCard } from "../profile/ArtworkCard";

export const ProjectsCard: React.FC = () => {
  const { data, isLoading, error } = useGetUserProfile(5);

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      <h2 className="xl:text-2xl text-xl text-mytext-dark font-semibold xl:pb-4 pb-1">
        Recent Projects
      </h2>
      <p className="xl:text-lg text-mytext-dark pb-1">
        See your latest drawings here.
      </p>

      <ArtworkCard artworks={data!.artwork} />
    </>
  );
};
