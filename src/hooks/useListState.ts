import type { SortOrder } from "@/components/ui/sort/sortItem";
import { useState } from "react";

export const useListState = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");

  return { searchQuery, setSearchQuery, sortOrder, setSortOrder };
};
