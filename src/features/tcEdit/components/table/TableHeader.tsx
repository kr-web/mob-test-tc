import { TableHeaderCell } from "@/components/common/table/header/TableHeaderCell";
import { Checkbox } from "@/components/ui/Checkbox";
import { tableHeaders } from "@/features/tcEdit/constants/tableHeader";

export const TableHeader = ({
  checkedAll,
  toggleCheckedAll,
  sortAsc,
  handleSort,
}: {
  checkedAll?: boolean;
  toggleCheckedAll?: () => void;
  sortAsc: boolean;
  handleSort: (updater: (prev: boolean) => boolean) => void;
}) => {
  return (
    <thead className="bg-secondary-darkgray1 text-white">
      <tr>
        {typeof toggleCheckedAll === "function" && (
          <th className="text-center align-middle">
            <div className="flex h-full items-center justify-center">
              <Checkbox checked={!!checkedAll} setChecked={toggleCheckedAll} />
            </div>
          </th>
        )}
        {tableHeaders.map((header) => (
          <TableHeaderCell
            key={header.id}
            label={header.label}
            sortAsc={sortAsc}
            handleSort={handleSort}
          />
        ))}
      </tr>
    </thead>
  );
};
