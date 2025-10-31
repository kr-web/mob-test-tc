import { type Dispatch, type SetStateAction } from "react";
import { ViewToggle } from "./ViewToggle";
import { Checkbox } from "@/components/ui/Checkbox";
import { SummaryText } from "@/components/common/SummaryText";
import { ListSearch } from "@/components/ui/search/ListSearch.tsx";
import { SortSelect } from "@/components/ui/sort/SortSelect";
import type { SortOrder } from "@/components/ui/sort/sortItem";

interface SortButtonProps {
  sortOrder: SortOrder;
  searchQuery: string;
  handleSortOrder: Dispatch<SetStateAction<SortOrder>>
  handleSearchQuery: (value: string) => void
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"list" | "grid">>;
  tcLen: number;
  checkedAll: boolean;
  toggleCheckedAll: () => void;
}

export const TcListToolbar = ({
  sortOrder,
  searchQuery,
  handleSortOrder,
  handleSearchQuery,
  viewMode,
  setViewMode,
  tcLen,
  checkedAll,
  toggleCheckedAll,
}: SortButtonProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* left section */}
      <div className="flex items-center gap-4 px-3.5">
        <Checkbox checked={checkedAll} setChecked={toggleCheckedAll} />
        <SummaryText tcLen={tcLen} canDark={true} />

        {/* sort button */}
        <SortSelect sortOrder={sortOrder} handleSortOrder={handleSortOrder} />
      </div>

      {/* right section */}
      <div className="flex items-center gap-3">
        {/* toggle view */}
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        {/* search */}
        <div className="w-[267px]">
          <ListSearch
            searchQuery={searchQuery}
            handleSearchQuery={handleSearchQuery}
          />
        </div>
      </div>
    </div>
  );
};
