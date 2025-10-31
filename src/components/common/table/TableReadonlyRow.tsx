import type { TcRow } from "@/features/tcEdit/types/TcRow";
import { ReadonlyCell } from "./tableCell/ReadonlyCell";
import { tableColumns } from "@/features/tcEdit/constants/tableColumns";

interface TableRowProps {
  tcRow: TcRow;
}

export const TableReadonlyRow = ({ tcRow }: TableRowProps) => {
  return (
    <tr className="border border-transparent transition odd:bg-white even:bg-primary-gray dark:odd:bg-primary-navy dark:even:bg-secondary-darkgray1">
      {tableColumns.map(({ key, align }) => (
        <td
          key={key}
          className={`whitespace-pre-line px-3 py-3 text-secondary-darkgray2 dark:text-primary-gray`}
        >
          <ReadonlyCell value={tcRow[key]} align={align} />
        </td>
      ))}
    </tr>
  );
};
