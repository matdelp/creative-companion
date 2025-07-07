import React from "react";
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
          <img
            className="h-32 w-32 rounded-full border-4 border-white object-cover"
            src={picture!}
            alt="Profile picture"
          />
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

        <div className="flex justify-center space-x-3 pb-5">
          <button
            onClick={() => alert("not implemented yet")}
            className="flex-1 cursor-pointer bg-myblue-400 hover:bg-myblue-800 text-whiteText-accent font-semibold max-w-1/2 py-2 px-4 rounded-lg transition duration-150 ease-in-out"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

// TODO implement logic for editing
