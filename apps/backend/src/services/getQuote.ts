import axios from "axios";

export const getQuote = async () => {
  const API = "https://api.api-ninjas.com/v1/quotes";
  const APIKEY = process.env.QUOTEAPIKEY;
  try {
    const response = await axios.get(API, {
      headers: { "X-Api-Key": APIKEY },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching quote:",
      error.response?.data || error.message
    );
  }
};
