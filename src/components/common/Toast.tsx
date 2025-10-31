import { FaCheck } from "react-icons/fa6";
import { CloseButton } from "../ui/button/CloseButton";
import { Text } from "../ui/Typography/Text";

export const Toast = () => {
  const onClose = () => {
    console.log("우끼끼");
  };
  return (
    <div className="w-[280px] gap-2 rounded-lg bg-primary-navy p-3">
      <div className="flex justify-between text-primary-gray">
        <FaCheck className="h-5 w-5 text-status-true" />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold">저장완료</span>
          <Text variant="title-sm">편집모드로 돌아가 실행해주세요.</Text>
        </div>
        {/* 24*24 */}
        <CloseButton onClose={onClose} />
      </div>
      <div className="w-full rounded-[80px] bg-primary-green" />
    </div>
  );
};
