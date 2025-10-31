import { useState, type Dispatch, type SetStateAction } from "react";
import { SortButton } from "./SortButton.tsx";
import { sortOptions, type SortOrder } from "./sortItem.ts";
import { SortOption } from "./SortOption.tsx";

interface SortDropdownProps {
  sortOrder: SortOrder;
  handleSortOrder: Dispatch<SetStateAction<SortOrder>>
}

export const SortSelect = ({ sortOrder, handleSortOrder }: SortDropdownProps) => {
  const [open, setOpen] = useState(false);
  const sortLabel = sortOptions.find((o) => o.key === sortOrder)?.label ?? "";

  const handleDropdown = (key: SortOrder) => {
    handleSortOrder(key);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <SortButton sort={sortLabel} onClick={() => setOpen((prev) => !prev)} />

      {/* dropdown */}
      <div
        className={`absolute z-50 mt-2 flex min-w-full origin-top transform flex-col gap-2 rounded-lg bg-secondary-darkgray3 px-4 py-[10px] transition-all duration-200 ease-out ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {sortOptions.map((option) => (
          <SortOption
            key={option.key}
            option={option}
            isActive={sortOrder === option.key}
            onClick={() => handleDropdown(option.key)}
          />
        ))}
      </div>
    </div>
  );
};
