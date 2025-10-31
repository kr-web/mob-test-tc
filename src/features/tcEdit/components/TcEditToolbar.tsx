import { SummaryText } from "@/components/common/SummaryText";
import { Text } from "@/components/ui/Typography/Text";
import Sparkle from "@/assets/icons/common/sparkle.svg?react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useState } from "react";

interface TcEditToolbarProps {
  openRegen: () => void;
  openNoRec: () => void;
  tcLen: number;
}

export const TcEditToolbar = ({ openRegen, openNoRec, tcLen }: TcEditToolbarProps) => {
  const [clicked, setClicked] = useState<"good" | "bad" | null>(null);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <SummaryText tcLen={tcLen} />

      <div className="flex gap-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <button onClick={() => setClicked("good")} disabled={!!clicked}>
              <AiFillLike
                className={`h-6 w-6 ${
                  clicked === "good" ? "text-primary-blue" : "text-secondary-gray2"
                }`}
              />
            </button>
            <Text variant="title-sm" className="text-secondary-darkgray3">
              추천
            </Text>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={openNoRec} disabled={!!clicked}>
              <AiFillDislike
                className={`h-6 w-6 ${
                  clicked === "bad" ? "text-primary-blue" : "text-secondary-gray2"
                }`}
              />
            </button>
            <Text variant="title-sm" className="text-secondary-darkgray3">
              비추천
            </Text>
          </div>
        </div>
        <button
          className="flex h-9 items-center gap-2.5 rounded-lg bg-primary-navy px-[13px] py-2 text-primary-green"
          onClick={openRegen}
        >
          <Sparkle className="h-6 w-6" />
          <Text variant="title-md" className="text-center align-middle">
            전체 재생성
          </Text>
        </button>
      </div>
    </div>
  );
};
