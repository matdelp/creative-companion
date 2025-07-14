import type { ArtworkUpdate } from "@creative-companion/common";

const FETCH_URL = "/api/artwork/edit/";

export const updateArtwork = async (id: number, data: ArtworkUpdate) => {
  const res = await fetch(`${FETCH_URL}${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update artwork");
  }
  return res.json();
};
