import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NavHomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} className="p-2">
      <House className="font-bold dark:text-mypink-100 text-mytext-light xl:w-10 xl:h-10 w-6 h-6 cursor-pointer dark:hover:text-mypink-400 hover:text-myblue-700" />
    </button>
  );
};
