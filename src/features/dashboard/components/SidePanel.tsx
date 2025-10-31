import { ArrowRight } from "lucide-react";
import type { SidePanelItem } from "../constants/sidePanelItems";

export const SidePanel = ({
  item,
  handleTcSample,
}: {
  item: SidePanelItem;
  handleTcSample: (show: boolean) => void;
}) => {
  const Icon = item.icon;
  return (
    <div
      className={`flex h-44 w-[414px] flex-col gap-4 rounded-lg p-6 ${item.bgColor} ${item.textColor}`}
    >
      <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
        <Icon className="h-5 w-5" />
        <span className={item.textColor}>{item.title}</span>
      </div>

      <div className="flex h-[93px] w-[366px] gap-2">
        {item.label.map((box) => (
          <button
            key={box}
            className={`relative flex h-[93px] w-[116px] cursor-pointer flex-col items-start justify-start rounded-lg p-4 text-left ${item.boxColor} `}
            onClick={() => handleTcSample(true)}
          >
            <p className="whitespace-pre-line text-xs font-medium leading-[1.15] tracking-tight">
              {box}
            </p>
            <ArrowRight className="absolute bottom-4 right-4 h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
};
