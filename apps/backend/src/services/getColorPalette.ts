import axios from "axios";

export const getColorPalette = async () => {
  const hex = "0047AB"; // change to get a random one
  const mode = "analogic";
  const count = 3;
  const API = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}&format=json`;

  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error("Error fetching color palette:", error);
    return null;
  }
};
