import React from "react";

import { UploadModal } from "../components/home/UploadModal";
import { NavBar } from "../components/NavBar";
import { PromptContainer } from "../components/home/PromptContainer";

export const HomePage: React.FC = () => {
  return (
    <div className="bg-blackText-primary w-full min-h-screen flex flex-col gap-10">
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full gap-10 py-6">
        <PromptContainer />
        <UploadModal />
      </div>
    </div>
  );
};
