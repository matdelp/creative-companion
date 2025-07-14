import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
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
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        pathColor: "#4ade80",
        textColor: "#111",
        trailColor: "#e5e7eb",
      })}
    />
  );
};
