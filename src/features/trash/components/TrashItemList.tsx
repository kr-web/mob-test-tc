import { Text } from "@/components/ui/Typography/Text";
import { Checkbox } from "@/components/ui/Checkbox";
import { TcDateDisplay } from "@/features/tcList/components/list/common/TcDateDisplay";
import { useNavigate } from "react-router-dom";
import type { TcList } from "@/types/testcase";

interface BaseProps {
  item: TcList;
  handleCheckbox: (tcSeq: number) => void;
}

export const TrashItemList = ({ item, handleCheckbox }: BaseProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`scroll flex items-center justify-between rounded-xl border p-[14px] transition-all ${
        item.checked
          ? "border-primary-navy bg-white dark:border-primary-gray dark:bg-primary-navy"
          : "border-transparent"
      }`}
    >
      {/* left section */}
      <div className="flex items-center gap-3">
        <Checkbox checked={item.checked} setChecked={() => handleCheckbox(item.tcSeq)} />
        <button
          className="cursor-pointer hover:underline hover:underline-offset-4"
          onClick={() => navigate(`/trash/${item.tcSeq}`)}
        >
          <Text variant="body" className="text-secondary-darkgray3 dark:text-primary-gray">
            {item.name}
          </Text>
        </button>
      </div>

      {/* right section */}
      <TcDateDisplay date={item.date} />
    </div>
  );
};
