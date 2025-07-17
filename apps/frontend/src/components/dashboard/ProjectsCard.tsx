import React from "react";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { ProjectCarousel } from "./Carousel";

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
      <h2 className="xl:text-2xl text-xl text-mytext-dark dark:text-mytext-light font-semibold xl:pb-4 pb-1">
        Latest Sketchbook Pages
      </h2>
      <div className="flex justify-center items-center pt-5 ">
        <ProjectCarousel artworks={data!.artwork} />
      </div>
    </>
  );
};
