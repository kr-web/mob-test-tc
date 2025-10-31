import { Text } from "@/components/ui/Typography/Text";
import type { AiGuideResult } from "../../types/AiGuideResult";
import { useRef, useLayoutEffect } from "react"; // 💡 필요한 훅 추가
import { Link2 } from "lucide-react";

interface AiGuideResultProps {
  item: AiGuideResult;
  onToggle: (line: number) => void;
}

export const AiGuideResultSuccess = ({ item, onToggle }: AiGuideResultProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeightRef = useRef(0);

  useLayoutEffect(() => {
    if (contentRef.current) {
      contentHeightRef.current = contentRef.current.offsetHeight;
    }
  }, [item.result]);

  return (
    <div
      className="flex w-full items-start gap-3 hover:cursor-pointer"
      onClick={() => onToggle(item.line)}
    >
      <div className="flex w-full flex-col gap-1.5" ref={contentRef}>
        <div className="flex h-[60px] flex-col rounded-lg border border-secondary-gray0 bg-white p-3">
          <div className="flex items-center gap-1">
            <Link2 className="h-4 w-4 stroke-[1.5] text-secondary-gray2" />
            <span className="text-[10px] font-semibold leading-[13px] text-secondary-gray1">
              참고 문서
            </span>
          </div>
          <Text variant="body" className="text-secondary-darkgray3">
            TESTCASE_SAMPLE_Document.excel
          </Text>
        </div>
      </div>
    </div>
  );
};
