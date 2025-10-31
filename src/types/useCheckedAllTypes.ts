export interface CheckedItem {
  checkedAll: boolean;
  toggleCheckedAll: () => void;
  toggleChecked: (id: number) => void;
}
