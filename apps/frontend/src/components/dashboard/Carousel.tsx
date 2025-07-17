import type { Artwork } from "@creative-companion/common";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProjectCarouselProps = { artworks: Artwork[] };

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  artworks,
}) => {
  return (
    <div className="relative max-w-md">
      <Carousel
        className="py-6"
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        swipeable
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-mybackground-light-100 rounded-full p-2 shadow-lg hover:bg-mypink-100"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6 text-mypurple-700" />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-mybackground-light-100 rounded-full p-2 shadow-lg hover:bg-mypink-100"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6 text-mypurple-700" />
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected) => (
          <li
            className={`inline-block mx-2 my-0.5 w-3 h-3 rounded-full ${
              isSelected ? "bg-mypurple-400" : "bg-mypurple-100"
            }`}
            onClick={onClickHandler}
            style={{ cursor: "pointer" }}
          />
        )}
      >
        {artworks.map((artwork) => (
          <div key={artwork.id} className="flex flex-col items-center gap-4">
            <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={artwork.content}
                alt={artwork?.title || "Artwork"}
                className="w-full h-full object-cover"
              />
            </div>
            {artwork.title && (
              <p className="text-sm font-semibold text-mypurple-400">
                {artwork.title}
              </p>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
