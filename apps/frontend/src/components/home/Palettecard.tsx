import React from "react";

export type Color = { hex: string; name: string };
type PaletteCardProps = {
  colors: Color[];
};
const Palettecard: React.FC<PaletteCardProps> = ({ colors }) => {
  return (
    <div className="w-full flex justify-center gap-5">
      {colors.map((color, index) => (
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
