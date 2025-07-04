import React from "react";
import { CgProfile } from "react-icons/cg";

export const NavBar: React.FC = () => {
  return (
    <div className="min-w-full min-h-10 border border-white">
      <CgProfile className="h-full" />
    </div>
  );
};
