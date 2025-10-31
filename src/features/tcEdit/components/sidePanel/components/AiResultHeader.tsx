import { Text } from "@/components/ui/Typography/Text";
import clsx from "clsx";
import { AiResultPagination } from "./AiResultPagination";
import { AiGuideStatusInfo } from "@/features/tcEdit/constants/AiGuideStatusInfo";
import type { Pagination } from "@/types/Pagination";

interface AiResultHeaderProps {
  line: number;
  status: "collapsed" | "success" | "fail";
  pagination: Pagination;
}

export const AiResultHeader = ({ line, status, pagination }: AiResultHeaderProps) => {
  const { icon: Icon, color, label } = AiGuideStatusInfo[status];
  return (
    <div className="flex flex-col">
      <div className="flex h-8 items-center justify-between">
        <Text
          variant="title-md"
          className={clsx(
            status === "collapsed" ? "text-secondary-gray1" : "text-secondary-darkgray2",
          )}
        >
          Line{line}에 대한 재생성 결과
        </Text>

        {pagination.totalPages > 1 && <AiResultPagination pagination={pagination} />}
      </div>

      {status !== "collapsed" && (
        <div className={clsx("flex items-center gap-0.5 text-sm font-semibold", color)}>
          <Icon className="h-5 w-5" />
          <Text variant="mini">{label}</Text>
        </div>
      )}
    </div>
  );
};
