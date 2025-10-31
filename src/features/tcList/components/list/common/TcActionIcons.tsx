import { Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Edit from "@/assets/icons/common/edit.svg?react";

export const TcActionsIcons = ({
  isLinkHover,
  setIsLinkHover,
}: {
  isLinkHover: boolean;
  setIsLinkHover: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate("/tcEdit")}
        onMouseEnter={() => setIsLinkHover(true)}
        onMouseLeave={() => setIsLinkHover(false)}
      >
        <Edit
          className={`h-6 w-6 ${isLinkHover ? "text-primary-navy dark:text-primary-gray" : "text-secondary-gray1"}`}
        />
      </button>
      <button>
        <Link2 className="h-6 w-6 text-secondary-gray1 hover:text-primary-navy dark:hover:text-primary-gray" />
      </button>
    </>
  );
};
