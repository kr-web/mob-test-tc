import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";
import { TableCell } from "@/features/tcEdit/components/table/TableCell";
import { tableColumns } from "../../constants/tableColumns";
import { clsx } from "clsx";
import type { TcDetail } from "@/types/testcase";

interface TableRowProps {
  tcRow: TcDetail;
  toggleChecked?: (num: number) => void;
}

export const TableRow = ({ tcRow, toggleChecked }: TableRowProps) => {
  const [pinnedLevel, setPinnedLevel] = useState<0 | 1 | 2 | 3>(0);
  const [isTdEditing, setIsEditing] = useState<boolean>(false);

  const handlePin = (level: 1 | 2 | 3) => {
    setPinnedLevel((prev) => (prev >= level ? ((level - 1) as 0) : level));
  };

  const handleIsTdEditing = (active: boolean) => {
    setIsEditing(active);
  };

  const handleSave = () => {
    console.log("Saved~~");
  };

  return (
    <tr
      className={clsx(
        "border transition",
        tcRow.checked
          ? "border-primary-blue !bg-primary-blue/10"
          : "border-transparent odd:bg-white even:bg-primary-gray",
      )}
    >
      {toggleChecked && (
        <td className="px-3 py-3 text-center text-secondary-darkgray2">
          <Checkbox checked={tcRow.checked} setChecked={() => toggleChecked(tcRow.tcSeq)} />
        </td>
      )}

      {tableColumns.map(({ key, align, pinLevel }) => (
        <TableCell
          key={key}
          value={String(tcRow[key])}
          align={align}
          checked={tcRow.checked}
          pinned={pinLevel ? pinnedLevel >= pinLevel : false}
          handlePin={pinLevel ? () => handlePin(pinLevel) : undefined}
          onSave={handleSave}
          isTdEditing={isTdEditing}
          handleIsTdEditing={handleIsTdEditing}
        />
      ))}
    </tr>
  );
};
