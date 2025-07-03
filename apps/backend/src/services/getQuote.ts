import axios from "axios";

export const getQuote = async () => {
  const APIKEY = process.env.QUOTEAPIKEY;
  const API = "https://api.api-ninjas.com/v1/quotes";

  const response = await axios.get(API, {
    headers: { "X-Api-Key": APIKEY },
  });
  return response.data[0];
};
