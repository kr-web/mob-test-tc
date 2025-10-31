import clsx from "clsx";
import type { ReactNode } from "react";

export const GrayBox = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center rounded-lg p-2 gap-2 border border-secondary-gray0 bg-primary-gray",
        className
      )}
    >
      {children}
    </div>
  );
};
