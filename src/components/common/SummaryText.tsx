import { useLocation } from "react-router-dom";
import { Text } from "../ui/Typography/Text";

export const SummaryText = ({ tcLen, canDark = false }: { tcLen: number; canDark?: boolean }) => {
  const location = useLocation();
  const isTrashPage = location.pathname === "/trash";
  return (
    <div className={`flex gap-3 text-secondary-darkgray2 ${canDark && "dark:text-primary-gray"}`}>
      <Text variant="body">{isTrashPage && "삭제한 "}테스트케이스 총합</Text>

      <Text variant="body">
        <span className="text-status-false">{tcLen}</span> 개
      </Text>
    </div>
  );
};
