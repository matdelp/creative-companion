import React, { useEffect, useState } from "react";
import { PhotoCard } from "./PhotoCard";
import Palettecard, { type Color } from "./Palettecard";
import { QuoteCard } from "./QuoteCard";

const PromptContainer: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const [quoteAuthor, setQuoteAuthor] = useState<string>("");
  const [palette, setPalette] = useState<Color[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [photoAuthor, setPhotoAuthor] = useState<string>("");
  const [photoPromo, setPhotoPromo] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/prompt/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuote(data.quote.quote);
        setQuoteAuthor(data.quote.author);
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
    <div className="bg-whiteText-accent rounded-4xl w-4/5 flex flex-col gap-8">
      <div className="gap-4 flex flex-col">
        <h1 className="text-4xl text-myblue-400 font-semibold pt-15 pl-4">
          Inspiration of the day
        </h1>
        <QuoteCard quote={quote} author={quoteAuthor} />
      </div>
      <Palettecard colors={palette} />
      <PhotoCard url={photo} author={photoAuthor} promo={photoPromo} />
    </div>
  );
};

export default PromptContainer;
