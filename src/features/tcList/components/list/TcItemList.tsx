import { Text } from "@/components/ui/Typography/Text";
import { Checkbox } from "@/components/ui/Checkbox";
import { TcDateDisplay } from "./common/TcDateDisplay";
import { PinButton } from "@/components/ui/PinButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TcActionsIcons } from "./common/TcActionIcons";

interface BaseProps {
  item: {
    tcSeq: number;
    name: string;
    date: string;
    pinned?: boolean;
    checked: boolean;
  };
  handleCheckbox: (tcSeq: number) => void;
}

interface PinEnabledProps extends BaseProps {
  isPin: true;
  handlePin: (tcSeq: number) => void;
}

interface PinDisabledProps extends BaseProps {
  isPin?: false;
  handlePin?: never;
}

type TcItemListProps = PinEnabledProps | PinDisabledProps;

export const TcItemList = ({ item, handleCheckbox, isPin = false, handlePin }: TcItemListProps) => {
  const navigate = useNavigate();
  const [isLinkHover, setIsLinkHover] = useState<boolean>(false);

  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-[14px] transition-all ${
        item.checked
          ? "border-primary-navy bg-white dark:border-primary-gray dark:bg-primary-navy"
          : "border-transparent"
      }`}
    >
      {/* left section */}
      <div className="flex items-center gap-3">
        <Checkbox checked={item.checked} setChecked={() => handleCheckbox(item.tcSeq)} />
        <div className="flex items-center gap-2">
          {isPin && <PinButton pinned={item.pinned} handlePin={() => handlePin!(item.tcSeq)} />}

          <button
            onMouseEnter={() => setIsLinkHover(true)}
            onMouseLeave={() => setIsLinkHover(false)}
            onClick={() => navigate("/tcEdit")}
          >
            <Text
              variant="body"
              className={`text-secondary-darkgray3 dark:text-primary-gray ${isLinkHover && "cursor-pointer underline underline-offset-4"}`}
            >
              {item.name}
            </Text>
          </button>
          <TcActionsIcons isLinkHover={isLinkHover} setIsLinkHover={setIsLinkHover} />
        </div>
      </div>

      {/* right section */}
      <TcDateDisplay date={item.date} />
    </div>
  );
};
