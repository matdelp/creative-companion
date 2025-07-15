import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export const NavHomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} className="p-2">
      <GoHome className="text-xl font-bold text-mytext-light w-10 h-10 cursor-pointer" />
    </button>
  );
};
