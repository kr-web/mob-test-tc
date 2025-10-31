export type SortOrder = (typeof sortOptions)[number]["key"];

export interface SortOptionsProps {
  key: SortOrder;
  label: string;
}

export const sortOptions = [
  { key: "latest", label: "최신순" },
  { key: "oldest", label: "오래된순" },
] as const;
