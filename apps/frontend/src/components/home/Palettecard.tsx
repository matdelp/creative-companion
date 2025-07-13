import React from "react";

export type Color = { hex: string; name: string };
type PaletteCardProps = {
  colors: Color[];
  style: string;
};
const Palettecard: React.FC<PaletteCardProps> = ({ colors, style }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex justify-center gap-5">
        {colors.map((color, index) => (
          <div
            key={index}
            className={style}
            style={{ background: color.hex }}
            title={color.name}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Palettecard;
