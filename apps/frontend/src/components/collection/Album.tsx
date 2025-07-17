import React, { useState } from "react";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import { useGetArtworksWithSizes } from "../../hooks/useGetArtworksOriginalSizes";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Slide } from "yet-another-react-lightbox";

type CustomSlide = Slide & {
  title?: string;
  description?: string;
  artist?: string;
};
export const Album: React.FC = () => {
  const { data, isLoading, error } = useGetArtworksWithSizes();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const photos = data!.map((photo) => ({
    ...photo,
    src: photo.src,
    title: photo.title || `Art from ${photo.artist}`,
    description: photo.description,
    artist: photo.artist,
  }));

  return (
    <>
      <ColumnsPhotoAlbum
        photos={photos}
        padding={5}
        spacing={0}
        onClick={({ index, event }) => {
          if (event.shiftKey || event.altKey || event.metaKey) return;
          event.preventDefault();
          setLightboxIndex(index);
        }}
      />

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        slides={photos}
        index={lightboxIndex ?? 0}
        carousel={{ finite: true }}
        render={{
          slide: ({ slide }: { slide: CustomSlide }) => (
            <div className="flex flex-col items-center justify-center w-full h-full p-4">
              <img
                src={slide.src}
                alt={slide.title}
                className="max-h-[80vh] object-contain rounded-xl shadow-lg"
              />
              <div className="mt-4 text-white text-center">
                {slide.title && (
                  <h2 className="text-xl font-semibold">{slide.title}</h2>
                )}
                {slide.description && (
                  <p className="mt-1">{slide.description}</p>
                )}
                {slide.artist && (
                  <p className="mt-2 text-sm italic">By {slide.artist}</p>
                )}
              </div>
            </div>
          ),
        }}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" } }}
      />
    </>
  );
};
