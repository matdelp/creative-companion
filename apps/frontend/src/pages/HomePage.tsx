import React from "react";
import PromptContainer from "../components/home/PromptContainer";
import { UploadModal } from "../components/home/UploadModal";
import { NavBar } from "../components/NavBar";

export const HomePage: React.FC = () => {
  return (
    <div className="bg-blackText-primary w-full min-h-screen flex flex-col gap-10">
      <NavBar />
      <main className="flex flex-col justify-center items-center w-full gap-10 py-6">
        <PromptContainer />
        <UploadModal />
      </main>
    </div>
  );
};
