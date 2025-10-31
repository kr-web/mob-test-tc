import {SearchBar} from "./SearchBar";

import {Text} from "@/components/ui/Typography/Text";
import LogoIcon from "@/assets/logo/logo-mark-gn.svg?react";
import AddIcon from "@/assets/icons/actionBar/add.svg?react";

import type { MainContentProps } from "../../constants/btmNavItems.ts"

interface MainContentAllTypes extends MainContentProps {
  handleKeyDownSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const MainContent = ({ handleBtmNav, inputQuery, urlLength, screenshotsLength, handleKeyDownSearch }: MainContentAllTypes) => {
  // =========================================================================================
  // 상태관리 ----------------------------------------------------------------------------------
  const { query, setQuery } = inputQuery;

  ////////////////////////////////////////////////////////////////////////////////////////////
  return(
    <div className="flex flex-col justify-center items-center w-full h-[234px] gap-12">
      {/* header */}
      <div className="w-full flex flex-col text-center gap-4">
        <Text
          variant="title-lg"
          className="flex flex-col items-center justify-center gap-2 text-xl font-bold"
        >
          <LogoIcon className="w-[42px] h-[42px]" />
          첫 테스트케이스, 지금 바로 🚀
        </Text>

        <p className="whitespace-pre-line leading-5">
          생성, 수정, 복제까지{"\n"}— 놀이처럼 즐길 수 있는 QA 실험실
        </p>

        <SearchBar
          query={query}
          setQuery={setQuery}
          handleKeyDownSearch={handleKeyDownSearch}
        />

        <div className="flex items-center justify-center w-full max-400:gap-4">
          <button className="flex items-center justify-center gap-1 w-1/2 max-400:w-auto" onClick={() => handleBtmNav({ open: true, tab: "A" })}>
            <AddIcon className="w-5 h-5 text-secondary-gray1"/>
            <p className="flex gap-1 text-gray-400 text-[14px] tracking-[-0.02em]">
              URL 있어요?
              {
                urlLength === 0 ? <span>(0)</span> : <span className="text-secondary-red font-bold">({'+'+urlLength})</span>
              }
            </p>
          </button>
          <button className="flex items-center justify-center gap-1 w-1/2 max-400:w-auto" onClick={() => handleBtmNav({ open: true, tab: "B" })}>
            <AddIcon className="w-5 h-5 text-secondary-gray1"/>
            <p className="flex gap-1 text-gray-400 text-[14px] tracking-[-0.02em]">
              스샷올리면 정확도UP
              {
                screenshotsLength === 0 ? <span>(0)</span> : <span className="text-secondary-red font-bold">({'+'+screenshotsLength})</span>
              }
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
