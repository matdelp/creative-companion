import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export const NavHomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} className="p-2">
      <GoHome className="text-xl font-bold text-myblue-800 w-8 h-8 cursor-pointer" />
    </button>
  );
};
