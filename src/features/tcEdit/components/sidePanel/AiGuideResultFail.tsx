import { Text } from "@/components/ui/Typography/Text";
import Sparkle from "@/assets/icons/common/sparkle.svg?react";
import type { AiGuideResult } from "../../types/AiGuideResult";

interface AiGuideResultProps {
  item: AiGuideResult;
  onToggle: (line: number) => void;
}

export const AiGuideResultFail = ({ item, onToggle }: AiGuideResultProps) => {
  return (
    <div
      className="flex w-full items-start gap-3 hover:cursor-pointer"
      onClick={() => onToggle(item.line)}
    >
      <div className="flex w-full flex-col gap-1.5">
        <button className="flex h-[34px] items-center justify-center gap-1 rounded-lg bg-primary-gray p-3 text-secondary-purple">
          <Sparkle className="h-4 w-4" />
          <Text variant="title-sm">재생성</Text>
        </button>
      </div>
    </div>
  );
};
