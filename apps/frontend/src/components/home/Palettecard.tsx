import React from "react";

const PALETTE = [
  {
    hex: "#ff70a6",
    name: "Falu Red",
  },
  {
    hex: "#ff9770",
    name: "Slimy Green",
  },
  {
    hex: "#ffd670",
    name: "Torea Bay",
  },
  {
    hex: "#70d6ff",
    name: "Persian Blue",
  },
  {
    hex: "#b3e8fd",
    name: "Persian Blue",
  },
];

const Palettecard: React.FC = () => {
  return (
    <div className="w-full flex justify-center gap-5">
      {PALETTE.map((color, index) => (
        <div
          key={index}
          className="w-12 h-12 rounded-full"
          style={{ background: color.hex }}
        ></div>
      ))}
    </div>
  );
};

export default Palettecard;
