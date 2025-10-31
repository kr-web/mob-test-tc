import { Text } from "../ui/Typography/Text";

export const FileInfoText = () => {
  return (
    <div className="flex flex-col justify-between items-start py-1">
      <Text variant="body" className="text-secondary-darkgray3">
        {/* {format === "PDF" ? "샘플요구사항정의서.pdf" : "www.comes.co.kr"} */}
        상위 버전
      </Text>
      <Text variant="mini" className="text-secondary-gray1">
        {/* {format === "PDF" ? "20MB" : "컴즈(주)"} */}
        하위 버전
      </Text>
    </div>
  );
};
