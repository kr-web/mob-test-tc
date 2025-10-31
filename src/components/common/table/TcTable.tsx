import type { TcDetail } from "@/types/testcase";
import clsx from "clsx";
import type { ReactNode } from "react";

interface TcTableProps {
  tcDetailList: TcDetail[];
  tableColGroup: ReactNode;
  tableHeader: ReactNode;
  renderRow: (row: TcDetail) => ReactNode;
  className?: string;
}

export const TcTable = ({
  tcDetailList,
  tableColGroup,
  tableHeader,
  renderRow,
  className,
}: TcTableProps) => {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-primary-navy dark:border-secondary-darkgray1">
      <div className="flex-shrink-0 overflow-hidden">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          {tableColGroup}
          {tableHeader}
        </table>
      </div>

      <div className={clsx("scroll flex-1 overflow-y-auto", className)}>
        <table className="w-full table-fixed border-collapse text-left text-sm">
          {tableColGroup}
          <tbody>{tcDetailList.map((row) => renderRow(row))}</tbody>
        </table>
      </div>
    </div>
  );
};
