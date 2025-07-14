import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGetUserCreationDate } from "../../hooks/useGetUserCreationDate";
import { useGetTotalPrompts } from "../../hooks/useGetTotalPrompts";
import { useGetTotalArtworks } from "../../hooks/useGetTotalArtworks";

export const CompletedPromptDiagram: React.FC = () => {
  //   const {
  //     data: creationDate,
  //     isLoading: loadingFirst,
  //     error: errorFirst,
  //   } = useGetUserCreationDate();
  //   console.log({ creationDate });
  const creationDate = new Date();

  const {
    data: totalPrompts,
    isLoading: loadingSecond,
    error: errorSecond,
  } = useGetTotalPrompts(creationDate);
  console.log({ totalPrompts });
  //   const {
  //     data: completedPrompts,
  //     isLoading: loadingThird,
  //     error: errorThird,
  //   } = useGetTotalArtworks();
  //   console.log({ completedPrompts });

  if (loadingSecond) return <div>Loading…</div>;
  if (errorSecond) return <div>Error occurred</div>;

  //   const percentage =
  //     totalPrompts && completedPrompts
  //       ? Math.round((completedPrompts / totalPrompts) * 100)
  //       : 0;
  const percentage = 10;
  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        pathColor: "#4ade80", // Tailwind green-400
        textColor: "#111",
        trailColor: "#e5e7eb", // Tailwind gray-200
      })}
    />
  );
};
