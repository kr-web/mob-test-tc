import { Text } from "@/components/ui/Typography/Text";
import { FaCaretDown } from "react-icons/fa6";

interface SortButtonProps {
  sort: string;
  onClick: () => void;
}

export const SortButton = ({ sort, onClick }: SortButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between rounded-lg px-[20px] py-[10px] gap-[10px] min-w-[120px] h-9 bg-secondary-darkgray3 shadow-sm transition"
    >
      <Text variant="body" className="text-secondary-gray0">
        {sort}
      </Text>
      <FaCaretDown className="ml-auto text-secondary-gray0 w-[10px]" />
    </button>
  );
};
