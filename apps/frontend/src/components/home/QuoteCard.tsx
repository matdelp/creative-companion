import React from "react";

type QuoteCardProps = {
  quote: string;
  author: string;
};

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-blackText-primary text-justify text-lg px-4">
        {quote}
      </p>
      <div className="text-xs text-blackText-primary text-right w-full">
        -- from {author}
      </div>
    </div>
  );
};
