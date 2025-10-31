import { Text } from "@/components/ui/Typography/Text";
import { TcTooltip } from "../tooltip/TcTooltip";
import type { SummaryItem } from "../../constants/getSummaryItems";

export const SummaryCard = ({ item }: { item: SummaryItem }) => {
  const Icon = item.icon;
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl border border-secondary-gray0 bg-white p-4 text-secondary-darkgray3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-between gap-[7px]">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <Text variant="menu" className="!font-bold">
              {item.title}
            </Text>
          </div>
          <p className="font-pretendard whitespace-pre-line text-xs font-normal leading-4 tracking-[-0.02em]">
            {item.label}
          </p>
        </div>
        <div className="flex gap-5">
          <div className="flex">
            <p className="text-[45px] leading-[45px] text-primary-navy">{item.value}</p>
            <p className="font-pretendard self-end align-bottom text-2xl font-light leading-[100%] tracking-[-0.02em] text-secondary-gray2">
              {item.unit}
            </p>
          </div>
          {item.isScore && item.tooltip && (
            <TcTooltip>
              <item.tooltip />
            </TcTooltip>
          )}
        </div>
      </div>
    </div>
  );
};
