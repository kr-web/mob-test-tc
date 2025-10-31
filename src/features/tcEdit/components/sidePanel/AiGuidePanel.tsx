import { Text } from "@/components/ui/Typography/Text";
import { CircleX } from "lucide-react";
import { AiGuideResultItem } from "./AiGuideResultItem";
import { AiGuideItems } from "../../constants/AiGuideItems";
import { useGroupedByLine } from "../../hooks/useGroupedByLine";

export const AiGuidePanel = ({ onClose }: { onClose: () => void }) => {
  const AiGuideGrouped = useGroupedByLine(AiGuideItems);

  return (
    <aside className="fixed right-0 top-5 z-50 flex h-[calc(100vh-20px)] w-[397px] flex-col rounded-[9px] bg-white p-5 shadow-soft-md">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <Text variant="body-lg">X AI GUIDE</Text>
        <button className="text-gray-400 transition hover:text-gray-600" onClick={onClose}>
          <CircleX className="h-6 w-6 text-secondary-gray2" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="scroll flex-1 overflow-y-auto overflow-x-hidden pb-3 pr-2">
        <div className="space-y-4">
          {AiGuideGrouped.map(({ line, list }) => (
            <AiGuideResultItem key={line} line={line} items={list} />
          ))}
        </div>
      </div>
    </aside>
  );
};
