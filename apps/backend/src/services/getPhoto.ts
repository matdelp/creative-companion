import axios from "axios";

const APIKEY = process.env.PHOTOAPIKEY;

export const getPhoto = async (category: string) => {
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
