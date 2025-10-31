import type { Dispatch, SetStateAction } from "react";

import ListView from "@/assets/icons/tcList/filter/xgrid.svg?react";
import GridView from "@/assets/icons/tcList/filter/ygrid.svg?react";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"list" | "grid">>;
}

export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  return (
    <>
      <button onClick={() => setViewMode("list")}>
        <ListView
          className={`h-6 w-6 ${
            viewMode === "grid"
              ? "text-secondary-gray1 dark:text-secondary-darkgray2"
              : "text-secondary-darkgray2 dark:text-secondary-gray1"
          }`}
        />
      </button>
      <button onClick={() => setViewMode("grid")}>
        <GridView
          className={`h-6 w-6 ${
            viewMode === "grid"
              ? "text-secondary-darkgray2 dark:text-secondary-gray1"
              : "text-secondary-gray1 dark:text-secondary-darkgray2"
          }`}
        />
      </button>
    </>
  );
};
