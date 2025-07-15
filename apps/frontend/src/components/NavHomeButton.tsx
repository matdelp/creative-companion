import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export const NavHomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} className="p-2">
      <GoHome className="font-bold text-mytext-light xl:w-10 xl:h-10 w-6 h-6 cursor-pointer" />
    </button>
  );
};
