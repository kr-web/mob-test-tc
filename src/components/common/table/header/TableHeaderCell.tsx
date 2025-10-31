import { Text } from "@/components/ui/Typography/Text";
import { PiSortAscending, PiSortDescending } from "react-icons/pi";

export const TableHeaderCell = ({
  label,
  sortAsc,
  handleSort = () => {},
}: {
  label: string;
  sortAsc?: boolean;
  handleSort?: (updater: (prev: boolean) => boolean) => void;
}) => {
  return (
    <th className="py-3">
      <button
        className="mx-auto flex items-center justify-center gap-1"
        onClick={() => handleSort((prev) => !prev)}
      >
        {sortAsc && <PiSortAscending className="h-6 w-6" />}
        {sortAsc === false && <PiSortDescending className="h-6 w-6" />}

        <Text variant="mini" className="text-[13px]">
          {label}
        </Text>
      </button>
    </th>
  );
};
