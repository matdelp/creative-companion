import React from "react";

type InspirationCardProps = {
  inspiration: string;
};

export const InspirationCard: React.FC<InspirationCardProps> = ({
  inspiration,
}) => {
  return (
    <p className="text-mytext-dark dark:text-mypink-100 text-center xl:text-5xl text-xl xl:p-6 py-2 font-semibold xl:leading-relaxed leading-snug  w-full">
      {inspiration}
    </p>
  );
};
