import React from "react";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import { useGetArtworksWithSizes } from "../../hooks/useGetArtworksOriginalSizes";

export const Album: React.FC = () => {
  const { data, isLoading, error } = useGetArtworksWithSizes();

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return <ColumnsPhotoAlbum photos={data!} />;
};
