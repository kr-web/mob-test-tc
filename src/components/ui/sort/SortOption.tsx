import { Text } from "@/components/ui/Typography/Text";
import { Check } from "lucide-react";
import type { SortOptionsProps, SortOrder } from "./sortItem";

interface SortOptionProps {
  option: SortOptionsProps;
  isActive: boolean;
  onClick: (key: SortOrder) => void;
}

export const SortOption = ({ option, isActive, onClick }: SortOptionProps) => {
  return (
    <div
      className={`flex items-center gap-1 ${
        isActive ? "text-secondary-gray0" : "text-secondary-gray1"
      } hover:cursor-pointer`}
      onClick={() => onClick(option.key)}
    >
      <Check className="h-6 w-6" />
      <Text variant="body">{option.label}</Text>
    </div>
  );
};
