import { Text } from "@/components/ui/Typography/Text";
import type { TcRow } from "@/features/tcEdit/types/TcRow";

export const ReadonlyCell = ({
  value,
  align = "center",
}: {
  value: TcRow[keyof TcRow];
  align?: "left" | "center";
}) => {
  return (
    <Text variant="title-sm" className={`whitespace-pre-line leading-tight text-${align}`}>
      {value}
    </Text>
  );
};
