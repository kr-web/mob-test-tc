import { Button } from "@/components/ui/button/Button.tsx";
import { SearchBar } from "./SearchBar";
import LogoMark from "@/assets/logo/logo-mark-gn.svg?react";
import { Text } from "@/components/ui/Typography/Text.tsx";
import { colorbox } from "../../constants/colorbox";
import { ContentCard } from "./ContentCard.tsx";
import type { Dispatch, SetStateAction } from "react";
import type { UploadFiles } from "@/types/UploadFiles";

export const MainContent = ({
  openGenModal,
  handleContentClick,
  prompt,
  setPrompt,
                              files,
}: {
  openGenModal: () => void;
  handleContentClick: (id: number) => void;
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  files:UploadFiles;
}) => {
  return (
    <div className="flex h-[600px] w-[704px] flex-col items-center justify-center gap-12 rounded-lg bg-white dark:bg-primary-navy">
      {/* header */}
      <div className="flex flex-col gap-4 text-center text-primary-navy dark:text-white">
        <Text variant="title-lg" className="flex items-center justify-center gap-3">
          <LogoMark className="h-8 w-8" /> 첫 테스트케이스, 지금 바로 🚀
        </Text>

        <Text variant="title-md">생성, 수정, 복제까지 — 놀이처럼 즐길 수 있는 QA 실험실</Text>

        <SearchBar prompt={prompt} setPrompt={setPrompt} />
      </div>

      {/* card list */}
      <div className="flex h-[149px] w-[540px] flex-col items-center justify-center gap-3">
        <Text variant="body" className="text-primary-navy dark:text-white">
          결과가 더 정밀하게 나와요!
        </Text>

        <div className="grid grid-cols-5 gap-3 rounded-lg">
          {colorbox.map((item, index) => {
            const fileLengths = [
              files.requirementsDoc.length,
              files.uiSpecDoc.length,
              files.sourceCode.length,
              files.referenceUrl.length,
              files.screenshots.length,
            ];

            return (
              <ContentCard
                key={item.label}
                item={{ ...item, files: fileLengths[index] }}
                onClick={handleContentClick}
              />
            );
          })}
        </div>
      </div>

      <Button variant="round-box" className="bg-secondary-darkgray2" onClick={openGenModal}>
        <Text variant="body-lg" className="text-white">
          생성하기
        </Text>
      </Button>
    </div>
  );
};
