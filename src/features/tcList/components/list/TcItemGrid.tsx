import { Checkbox } from "@/components/ui/Checkbox";
import { Text } from "@/components/ui/Typography/Text";
import { TcDateDisplay } from "./common/TcDateDisplay";
import { TcActionsIcons } from "./common/TcActionIcons";
import { PinButton } from "@/components/ui/PinButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TcItemGridProps {
  item: {
    tcSeq: number;
    name: string;
    date: string;
    pinned?: boolean;
    checked: boolean;
  };
  handleCheckbox: (tcSeq: number) => void;
  handlePin: (tcSeq: number) => void;
}

export const TcItemGrid = ({ item, handleCheckbox, handlePin }: TcItemGridProps) => {
  const navigate = useNavigate();
  const [isLinkHover, setIsLinkHover] = useState<boolean>(false);
  return (
    <div
      className={`flex h-[250px] w-full max-w-[275px] flex-col gap-3 rounded-xl border p-5 ${item.checked ? "border-primary-navy dark:border-primary-gray" : "border-transparent"} bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-primary-navy`}
    >
      <div className="flex justify-between">
        <Checkbox checked={item.checked} setChecked={() => handleCheckbox(item.tcSeq)} />

        <PinButton
          mirrored={true}
          pinned={item.pinned}
          className="scale-x-[-1]"
          handlePin={() => handlePin(item.tcSeq)}
        />
      </div>

      <div className="flex flex-col gap-2 pr-8">
        <button
          onMouseEnter={() => setIsLinkHover(true)}
          onMouseLeave={() => setIsLinkHover(false)}
          onClick={() => navigate("/tcEdit")}
        >
          <Text
            variant="body"
            className={`text-left leading-[1] text-secondary-darkgray3 dark:text-primary-gray ${isLinkHover && "cursor-pointer underline underline-offset-1"}`}
          >
            {item.name}
          </Text>
        </button>

        <TcDateDisplay date={item.date} />
      </div>

      {/* bottom */}
      <div className="mt-auto flex items-center gap-2 text-[11px] text-secondary-gray1">
        <TcActionsIcons isLinkHover={isLinkHover} setIsLinkHover={setIsLinkHover} />
      </div>
    </div>
  );
};
