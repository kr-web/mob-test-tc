import { PinButton } from "@/components/ui/PinButton";
import { useState } from "react";
import { ReadonlyCell } from "../../../../components/common/table/tableCell/ReadonlyCell";
import { EditableCell } from "../../../../components/common/table/tableCell/EditableCell";

type Align = "left" | "center";

interface TableCellProps {
  value: string;
  align?: Align;
  checked?: boolean;
  pinned?: boolean;
  handlePin?: () => void;
  onSave?: (newValue: string) => void;
  isTdEditing?: boolean;
  handleIsTdEditing?: (active: boolean) => void;
}

export const TableCell = ({
  value,
  align = "center",
  checked,
  pinned,
  handlePin,
  onSave,
  isTdEditing = false,
  handleIsTdEditing,
}: TableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const showPin = checked && handlePin;

  const handleEditedValue = (value: string) => {
    setEditedValue(value);
  };

  const handleSave = () => {
    if (onSave) onSave(editedValue);
    setIsEditing(false);
    handleIsTdEditing?.(false);
  };

  const handleCancel = () => {
    setEditedValue(value);
    setIsEditing(false);
    handleIsTdEditing?.(false);
  };

  const handleClick = () => {
    if (isTdEditing) return;
    setIsEditing(true);
    handleIsTdEditing?.(true);
  };

  return (
    <td
      className={`whitespace-pre-line px-3 py-3 text-secondary-darkgray2 text-${align}`}
      onClick={handleClick}
    >
      <div
        className={`flex flex-col items-${align} justify-start gap-2 ${isEditing ? "cursor-default" : "cursor-pointer"}`}
      >
        {showPin && <PinButton pinned={pinned} handlePin={handlePin} className="!h-5 !w-5" />}
        {isEditing ? (
          <EditableCell
            editedValue={editedValue}
            handleEditedValue={handleEditedValue}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <ReadonlyCell value={editedValue} align={align} />
        )}
      </div>
    </td>
  );
};
