import React from "react";
import { EditModal } from "./EditModal";
import { Picture } from "./Picture";
type ProfileCardProps = {
  firstName: string;
  lastName: string;
  username: string;
  description?: string | null;
  picture?: string | null;
  projects: number;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  picture = "/images/Portrait_Placeholder.png",
  firstName,
  lastName,
  username,
  description = "Write here about your art and yourself !",
  projects,
}) => {
  return (
    <div className="w-full bg-whiteText-primary overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="h-42 bg-gradient-to-r from-mypink-400 to-myorange-400 relative">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <Picture image={picture!} />
        </div>
      </div>

      <div className="pt-16 pb-8 px-6 text-center flex flex-col gap-2 ">
        <h3 className="text-xl font-bold text-blackText-primary">
          {firstName} {lastName}
        </h3>
        <p className="text-myblue-800 font-medium">{username}</p>
        <p className="text-gray-500 mt-2">{description}</p>

        <div className="flex justify-center space-x-6 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{projects}</p>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <EditModal />
        </div>
      </div>
    </div>
  );
};

// TODO implement logic for editing
