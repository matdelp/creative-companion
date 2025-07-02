import React from "react";
import { ImageCard } from "../components/home/ImageCard";
import { QuoteCard } from "../components/home/QuoteCard";

export const HomePage: React.FC = () => {
  return (
    <div className="bg-whiteText-accent w-full h-screen">
      <nav className="w-full bg-mypink-400">Navbar</nav>
      <main className="flex flex-col justify-center items-center h-full gap-10">
        <h1 className="text-4xl text-myblue-400">Inspiration of the day</h1>
        <ImageCard />
        <QuoteCard />
        <div>Palette</div>
        <div>upload your art</div>
      </main>
    </div>
  );
};
