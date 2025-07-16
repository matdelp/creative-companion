import { Paintbrush } from "lucide-react";
import React from "react";
type LogoProps = {
  paintbrushStyle: string;
  divStyle: string;
};
export const Logo: React.FC<LogoProps> = ({ paintbrushStyle, divStyle }) => {
  return (
    <div className="flex gap-2 items-center p-2 pb-4">
      <Paintbrush className={paintbrushStyle} />
      <div className={divStyle}>
        <span>Creative </span>
        <span>Companion</span>
      </div>
    </div>
  );
};
