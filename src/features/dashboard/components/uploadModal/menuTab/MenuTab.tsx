import { colorbox } from "../../../constants/colorbox.ts";
import { Text } from "@/components/ui/Typography/Text.tsx";

export const MenuTab = ({
  currentTab,
  handleMenuTab,
}: {
  currentTab: number;
  handleMenuTab: (id: number) => void;
}) => {
  return (
    <div className="grid grid-cols-5 rounded-lg bg-primary-gray p-1">
      {colorbox.map((box) => (
        <button
          key={box.id}
          className={`flex h-[37px] items-center justify-center rounded-lg transition-all duration-150 ${
            currentTab === box.id
              ? "scale-[1.02] bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)]"
              : "text-secondary-darkgray2 hover:bg-gray-100 active:scale-[0.97]"
          }`}
          onClick={() => handleMenuTab(box.id)}
        >
          <Text
            variant="body-md"
            className={`transition-colors ${
              currentTab === box.id ? "text-primary-navy" : "text-secondary-gray1"
            }`}
          >
            {box.label}
          </Text>
        </button>
      ))}
    </div>
  );
};
