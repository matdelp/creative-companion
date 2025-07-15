import { Paintbrush } from "lucide-react";
import React from "react";
type LogoProps = {
  paintbrushStyle: string;
  divStyle: string;
};
export const Logo: React.FC<LogoProps> = ({ paintbrushStyle, divStyle }) => {
  return (
    <div className="flex xl:gap-2 gap-1 items-center">
      <Paintbrush className={paintbrushStyle} />
      <div className={divStyle}>
        <span>Creative </span>
        <span>Companion</span>
      </div>
    </div>
  );
};
