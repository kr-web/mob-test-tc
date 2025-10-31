import { Text } from "@/components/ui/Typography/Text";
import { FaCaretUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { DefaultProfile } from "./DefaultProfile";
import type {Dispatch, SetStateAction} from "react";
import { useNavigate } from "react-router-dom";
import type { WorkspaceOption } from "@/types/workspaceOption.ts";

interface WorkspaceItemPropsBase {
  type: "title" | "content";
  name: string;
  img?: File | null; // title일 때만 사용
  setWorkspaceOption?: Dispatch<SetStateAction<WorkspaceOption[]>>;
  isOpen?: boolean;        // title
  isClose?: () => void;    // content
  openModal?: () => void;  // content
}

export const WorkspaceItem = ({
                                type,
                                name,
                                img = null,
                                setWorkspaceOption,
                                isOpen,
                                isClose,
                                openModal,
                              }: WorkspaceItemPropsBase) => {
  // ACTION : 워크스페이스 전환 --------------------------------------------------------
  const navigate = useNavigate();
  const handleSelect = () => {
    if (type === "content" && setWorkspaceOption && isClose) {
      setWorkspaceOption((prev) =>
        prev.map((o) => ({ ...o, isSelected: o.name === name }))
      );
      navigate("/");
      isClose();
    }
  };

  return (
    <div className="flex w-[200px] items-center gap-2 cursor-pointer">
      <div className="flex items-center gap-2" onClick={handleSelect}>
        <DefaultProfile name={name.charAt(0)} size="sm" src={img} />

        <Text
          variant="menu-sm"
          className={`ml-2 select-none text-secondary-darkgray1 ${type === "title" ? 'dark:text-white' : 'dark:text-secondary-gray1'}`}
        >
          {name}
        </Text>
      </div>

      {type === "title" ? (
        isOpen ? (
          <FaCaretUp className="ml-auto w-2.5 text-secondary-gray2 dark:text-primary-gray" />
        ) : (
          <FaCaretDown className="ml-auto w-2.5 text-secondary-gray2 dark:text-primary-gray" />
        )
      ) : (
        <button onClick={openModal} className="ml-auto mr-2.5">
          <IoIosSettings className="h-4 w-4 text-secondary-gray1" />
        </button>
      )}
    </div>
  );
};
