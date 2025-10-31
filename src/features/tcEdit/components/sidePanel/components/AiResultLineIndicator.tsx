import { Text } from "@/components/ui/Typography/Text";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

interface AiResultLineProps {
  line: number;
  status: "collapsed" | "success" | "fail";
  borderHeight: number;
}

export const AiResultLineIndicator = ({ line, status, borderHeight }: AiResultLineProps) => {
  const isCollapsed = status === "collapsed";
  const isSuccess = status === "success";
  const isFail = status === "fail";
  return (
    <div className="flex items-start">
      <div className="flex h-8 w-8 items-center justify-center">
        {isCollapsed ? (
          <FaAngleRight className="text-secondary-navy h-4 w-4" />
        ) : (
          <FaAngleDown className="text-secondary-navy h-4 w-4" />
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${isCollapsed && "bg-primary-gray text-secondary-darkgray3"} ${isSuccess && "bg-primary-navy text-white"} ${isFail && "border border-status-false text-status-false"}`}
          >
            <Text variant="body-md">{line}</Text>
          </div>
        </div>

        {isSuccess && (
          <div
            style={{ height: `${borderHeight - 40}px` }}
            className="mt-2 border border-secondary-gray0"
          />
        )}
      </div>
    </div>
  );
};
