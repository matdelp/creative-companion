import type { ArtworkDates } from "@creative-companion/common";

export const parseCompletedDates = (data: ArtworkDates[]) => {
  return data.map((item) => {
    const date = new Date(item.created_at);
    return date.toISOString().split("T")[0];
  });
};
