import { getImageSize } from "../utils/parseArtworkList";
import { useGetArtworks } from "./useGetArtworks";
import { useQuery } from "@tanstack/react-query";

export const useGetArtworksWithSizes = () => {
  const { data: artworks, ...rest } = useGetArtworks();

  const sizesQuery = useQuery({
    queryKey: ["ArtworksWithOriginalSizes", artworks],
    queryFn: async () => {
      if (!artworks) return [];
      return Promise.all(
        artworks.map(async (photo) => {
          const { width, height } = await getImageSize(photo.content);
          return {
            src: photo.content,
            width,
            height,
            title: photo.title,
            description: photo.description,
            artist: photo.user.username,
          };
        })
      );
    },
    enabled: !!artworks,
  });

  return {
    data: sizesQuery.data,
    isLoading: rest.isLoading || sizesQuery.isLoading,
    error: rest.error || sizesQuery.error,
  };
};
