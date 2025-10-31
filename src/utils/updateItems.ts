import type { SetStateAction } from "react";

type UpdateFn<T> = (prev: T[]) => T[];

export const updateItems = <T>(setItems: React.Dispatch<SetStateAction<T[]>>) => {
  return (next: T[] | UpdateFn<T>) => {
    if (typeof next === "function") {
      setItems((prev) => (next as UpdateFn<T>)(prev));
    } else {
      setItems(next);
    }
  };
};
