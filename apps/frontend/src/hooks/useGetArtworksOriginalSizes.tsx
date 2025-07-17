import { useEffect, useState } from "react";
import { getImageSize } from "../utils/parseArtworkList";
import { useGetArtworks } from "./useGetArtworks";
import type { ArtworkWithSize } from "@creative-companion/common";

export const useGetArtworksWithSizes = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useGetArtworks();

  const [artworksWithSizes, setArtworksWithSizes] = useState<ArtworkWithSize[]>(
    []
  );

  useEffect(() => {
    if (!data) return;
    const allArtworks = data.pages.flatMap((page) => page.data);
    if (allArtworks.length === artworksWithSizes.length) return;
    const newArtworks = allArtworks.slice(artworksWithSizes.length);

    Promise.all(
      newArtworks.map(async (photo) => {
        const { width, height } = await getImageSize(photo.content);
        return {
          ...photo,
          src: photo.content,
          width,
          height,
        };
      })
    ).then((newArtworksWithSizes) => {
      setArtworksWithSizes((prev) => [...prev, ...newArtworksWithSizes]);
    });
  }, [data]);

  return {
    data: artworksWithSizes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
