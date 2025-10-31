import { SummaryCard } from "@/features/tcEdit/components/card/SummaryCard";
import type { SummaryItem } from "@/features/tcEdit/constants/getSummaryItems";

export const TcDetailSummaryCard = ({ summaryItems }: { summaryItems: SummaryItem[] }) => {
  return (
    <div className="flex flex-col">
      <div className="grid min-h-[107px] grid-cols-3 gap-3 pb-4">
        {summaryItems.map((item) => (
          <SummaryCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};
