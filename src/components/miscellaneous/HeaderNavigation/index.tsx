import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface HeaderNavigationProps {
  screenTitle: string;
  onBack?: () => void;
}

export function HeaderNavigation({
  screenTitle,
  onBack,
}: HeaderNavigationProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-row  items-center ">
      <button onClick={onBack ? onBack : () => navigate(-1)}>
        <FiArrowLeft size={32} className="text-black dark:text-white " />
      </button>
      <h1 className="text-black dark:text-white text-xl lg:text-2xl ml-2 font-bold font-secondary">
        {screenTitle}
      </h1>
    </div>
  );
}
