import { HoverBox } from "@/components/common/HoverBox";
import { Text } from "@/components/ui/Typography/Text";
import Preview from "@/assets/icons/tcEdit/modal/document.svg?react";
import Right from "@/assets/icons/tcEdit/modal/rightCircle.svg?react";
import { useState } from "react";

type HoverType = "preview" | "link" | null;

export const TcListModalItem = () => {
  const [isHover, setIsHover] = useState<HoverType>(null);
  const hoverLabel = isHover === "preview" ? "미리보기" : "바로가기";

  return (
    <div className="flex h-[60px] items-center justify-between rounded-lg border border-secondary-gray0 p-2">
      {/* left file info */}
      <div className="flex flex-col gap-2">
        <Text variant="body" className="text-secondary-darkgray3">
          01_로그인테스트케이스_250918_1
        </Text>
        <Text variant="menu-sm" className="text-secondary-gray1">
          2025.10.15 AM 09:24:32
        </Text>
      </div>

      {/* right icons */}
      <div className="relative flex items-center justify-center gap-1">
        {/* preview button */}
        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setIsHover("preview")}
          onMouseLeave={() => setIsHover(null)}
        >
          <button className="flex h-10 w-10 items-center justify-center">
            <Preview className="h-6 w-6 text-secondary-gray1 transition-colors hover:text-primary-navy" />
          </button>
          {isHover === "preview" && <HoverBox label={hoverLabel} />}
        </div>

        {/* link button */}
        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setIsHover("link")}
          onMouseLeave={() => setIsHover(null)}
        >
          <button className="flex h-10 w-10 items-center justify-center">
            <Right className="h-6 w-6 text-secondary-gray1 transition-colors hover:text-primary-navy" />
          </button>
          {isHover === "link" && <HoverBox label={hoverLabel} />}
        </div>
      </div>
    </div>
  );
};
