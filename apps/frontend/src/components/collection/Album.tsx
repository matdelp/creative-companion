import React, { useEffect, useState } from "react";
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import { useGetArtworksWithSizes } from "../../hooks/useGetArtworksOriginalSizes";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Slide } from "yet-another-react-lightbox";
import { useInView } from "react-intersection-observer";

type CustomSlide = Slide & {
  title?: string;
  description?: string;
  artist?: string;
};
export const Album: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetArtworksWithSizes();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading artworks</div>;

  const album = data!.map(({ src, width, height }) => ({
    src,
    width,
    height,
  }));

  return (
    <>
      <ColumnsPhotoAlbum
        photos={album}
        padding={5}
        spacing={0}
        onClick={({ index, event }) => {
          if (event.shiftKey || event.altKey || event.metaKey) return;
          event.preventDefault();
          setLightboxIndex(index);
        }}
      />
      <div ref={ref} style={{ height: 1 }}></div> {/* sentinel */}
      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        slides={data!}
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
