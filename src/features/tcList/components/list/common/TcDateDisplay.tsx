import { Text } from "@/components/ui/Typography/Text";
import { Clock } from "lucide-react";

export const TcDateDisplay = ({ date }: { date: string }) => {
  return (
    <div className="flex items-center gap-1 text-secondary-gray1">
      <Clock className="w-5 h-5" />
      <Text variant="menu-sm">{date}</Text>
    </div>
  );
};
