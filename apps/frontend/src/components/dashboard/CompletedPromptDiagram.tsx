import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGetTotalArtworks } from "../../hooks/useGetTotalArtworks";
import { useGetTotalPrompts } from "../../hooks/useGetTotalPrompts";
import { useGetUserCreationDate } from "../../hooks/useGetUserCreationDate";

export const CompletedPromptDiagram: React.FC = () => {
  const {
    data: creationDate,
    isLoading: loadingFirst,
    error: errorFirst,
  } = useGetUserCreationDate();
  const {
    data: totalPrompts,
    isLoading: loadingSecond,
    error: errorSecond,
  } = useGetTotalPrompts(creationDate);
  const {
    data: completedPrompts,
    isLoading: loadingThird,
    error: errorThird,
  } = useGetTotalArtworks();

  if (loadingFirst || loadingSecond || loadingThird) return <div>Loading…</div>;
  if (errorFirst || errorSecond || errorThird) return <div>Error occurred</div>;

  const percentage =
    totalPrompts && completedPrompts
      ? Math.round((completedPrompts / totalPrompts) * 100)
      : 0;

  return (
    <CircularProgressbarWithChildren
      value={percentage}
      background
      backgroundPadding={6}
      styles={buildStyles({
        backgroundColor: "#12475c",
        textColor: "#fff",
        pathColor: "#fff",
        trailColor: "transparent",
      })}
    >
      {
        <div className="text-whiteText-accent font-bold flex flex-col items-center">
          <p className="text-2xl">{percentage}%</p>
          <p className="text-xl">completed </p>
          <p className="text-xl">prompts!</p>
        </div>
      }
    </CircularProgressbarWithChildren>
  );
};
