import * as Tooltip from "@radix-ui/react-tooltip";
import { useState, type ReactNode } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";

export const TcTooltip = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <span>
            <AiFillQuestionCircle
              className={`h-6 w-6 cursor-pointer transition-colors duration-150 ${
                open ? "text-primary-blue" : "text-secondary-gray1 hover:text-primary-blue"
              }`}
            />
          </span>
        </Tooltip.Trigger>

        <Tooltip.Portal>{children}</Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
