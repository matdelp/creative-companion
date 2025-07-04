import React from "react";

type InspirationCardProps = {
  inspiration: string;
};

export const InspirationCard: React.FC<InspirationCardProps> = ({
  inspiration,
}) => {
  return (
    <div className="w-full flex flex-col items-center bg-white rounded-xl shadow-lg py-4 transition-transform hover:scale-105">
      <p className="text-blackText-primary text-center text-xl px-4 font-semibold">
        {inspiration}
      </p>
    </div>
  );
};
