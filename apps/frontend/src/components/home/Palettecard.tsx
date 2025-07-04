import React from "react";

export type Color = { hex: string; name: string };
type PaletteCardProps = {
  colors: Color[];
};
const Palettecard: React.FC<PaletteCardProps> = ({ colors }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 pt-8">
      <div className="flex justify-center gap-5">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-14 h-14 rounded-full shadow-md "
            style={{ background: color.hex }}
            title={color.name}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Palettecard;
