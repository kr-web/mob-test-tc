import { TableHeaderCell } from "@/components/common/table/header/TableHeaderCell";
import { tableHeaders } from "../../constants/tableHeader";

export const TableHeader = () => {
  return (
    <thead className="bg-secondary-darkgray1 text-white">
      <tr>
        {tableHeaders.map((header) => (
          <TableHeaderCell key={header.id} label={header.label} />
        ))}
      </tr>
    </thead>
  );
};
