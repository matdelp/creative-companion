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
      <h2 className="text-lg text-mypink-800 font-semibold">Recent Projects</h2>
      <p className="text-sm text-mypink-800 pb-2">
        See your latest drawings here.
      </p>
      <ArtworkCard artworks={data!.artwork} />
    </>
  );
};
