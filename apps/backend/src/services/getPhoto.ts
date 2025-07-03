import axios from "axios";

export const getPhoto = async (category: string) => {
  const APIKEY = process.env.PHOTOAPIKEY;
  const API = `https://api.unsplash.com/photos/random?query=${category}`;

  try {
    const response = await axios.get(API, {
      headers: {
        Authorization: `Client-ID ${APIKEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photo:", error);
    return null;
  }
};
