import React, { useEffect, useState } from "react";
import { PhotoCard } from "./PhotoCard";
import Palettecard, { type Color } from "./Palettecard";
import { InspirationCard } from "./InspirationCard";

const PromptContainer: React.FC = () => {
  const [inspiration, setInspiration] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [palette, setPalette] = useState<Color[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [photoAuthor, setPhotoAuthor] = useState<string>("");
  const [photoPromo, setPhotoPromo] = useState<string>("");

  useEffect(() => {
    fetch("/api/prompt/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setInspiration(data.inspiration.name);
        setTheme(data.inspiration.category);
        setPalette(data.palette);
        setPhoto(data.photo.url);
        setPhotoAuthor(data.photo.author);
        setPhotoPromo(data.photo.promo);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div className="bg-whiteText-accent rounded-4xl w-4/5 max-w-3xl mx-auto flex flex-col gap-2 shadow-lg">
      <div className="p-10 flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-6 items-center w-full">
          <h1 className="text-4xl text-myblue-500 text-center font-bold pt-4 pb-2">
            Today's Inspiration
          </h1>
          <span className="text-myblue-400 font-semibold text-5xl">
            {theme}
          </span>
          <InspirationCard inspiration={inspiration} />
        </div>
        <div className="flex justify-center">
          <Palettecard colors={palette} />
        </div>
      </div>
      <div className="flex justify-center">
        <PhotoCard url={photo} author={photoAuthor} promo={photoPromo} />
      </div>
    </div>
  );
};

export default PromptContainer;
