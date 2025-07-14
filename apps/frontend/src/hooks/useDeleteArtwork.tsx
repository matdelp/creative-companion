const FETCH_URL = "/api/artwork/delete/";

export async function deleteArtwork(id: number) {
  const res = await fetch(`${FETCH_URL}${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete artwork");
  }
  return res.json();
}
