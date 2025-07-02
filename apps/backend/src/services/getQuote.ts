import axios from "axios";

export const getQuote = async () => {
  const API = "https://api.api-ninjas.com/v1/quotes";
  const APIKEY = "Ez+No7m46L5KPfFRJHygtA==mfDT2uq34mgg6Xe9";
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
