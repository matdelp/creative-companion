import React from "react";

type InspirationCardProps = {
  inspiration: string;
};

export const InspirationCard: React.FC<InspirationCardProps> = ({
  inspiration,
}) => {
  return (
    <p className="text-mytext-dark text-center text-5xl p-6 font-semibold leading-relaxed">
      {inspiration}
    </p>
  );
};
