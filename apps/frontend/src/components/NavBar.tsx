import React from "react";
import { CgProfile } from "react-icons/cg";

export const NavBar: React.FC = () => {
  return (
    <div className="w-full min-h-10 bg-amber-300">
      <CgProfile className="h-full" />
    </div>
  );
};
