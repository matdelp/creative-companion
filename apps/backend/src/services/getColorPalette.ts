import axios from "axios";

const getRandomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
  return randomColor.padStart(6, "0");
};

export const getColorPalette = async () => {
  const hex = getRandomHexColor(); // change to get a random one
  const mode = "triad"; //Choices: monochrome monochrome-dark monochrome-light analogic complement analogic-complement triad quad
  const count = 5;
  const API = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}&format=json`;

  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error("Error fetching color palette:", error);
    return null;
  }
};
