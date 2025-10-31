import { useState } from "react";
import { UrlCard } from "./UrlCard.tsx";
import { Toast } from "@/components/toast/Toast";
import { useToast } from "@/hooks/useToast";
import { useFileUploadUrl } from "@/hooks/useFileUploadUrl";

import AddIcon from "@/assets/icons/actionBar/add.svg?react";
import WarningIcon from "@/assets/icons/toast/warning.svg?react";

import type { HandleFiles, UploadFiles } from "../../../constants/btmNavItems.ts";

type UrlProps = {
  files: UploadFiles;   // tempFiles만 사용
  itemAdd: HandleFiles['itemAdd'];
  itemRemove: HandleFiles['itemRemove'];
};

export const Url = ({ files, itemAdd, itemRemove } : UrlProps) => {
  // =========================================================================================
  // 상태 관리 --------------------------------------------------------------------------------
  const [ query, setQuery] = useState<string>("");
  const { toastState, toastOpen, toastClose } = useToast();
  const { addQuery, invalid } = useFileUploadUrl({query, urls: files.referenceUrl ?? [], toastOpen});

  // =========================================================================================
  // ACTION : URL 추가 ------------------------------------------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter"){
      handleUrlList();
    }
  }

  const handleUrlList = () => {
    const isValid = addQuery();
    if (!isValid) return;

    toastClose();
    itemAdd("referenceUrl",{ url: "www." + query, title: "title" });
    setQuery("");
  }

  // ACTION : URL 삭제 ------------------------------------------------------------------------
  const DeleteQuery = (index: number) => itemRemove("referenceUrl", index);

  // =========================================================================================
  // RENDER ----------------------------------------------------------------------------------
  return (
    <div className="mt-5 mb-3 w-full flex flex-col gap-5">
      {/* URL 리스트 */}
      <div
        className={`${
          invalid.status ? "h-[372px]" : "h-[400px]"
        } overflow-y-auto w-full flex flex-col gap-2 pr-2 scroll`}
      >
        {(files.referenceUrl ?? []).map((item, index) => (
          <UrlCard
            key={`${item.url}-${index}`}
            item={item}
            DeleteQuery={() => DeleteQuery(index)}
          />
        ))}
      </div>

      {/* URL 입력창 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center w-full gap-[10px] h-9 border border-primary-navy rounded-lg bg-white">
          <div className="relative w-full px-4 py-[10px]">
            <p className="absolute top-[13px] text-[14px] font-medium text-secondary-darkgray1 tracking-[-0.0175em]">
              www.
            </p>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 w-full bg-transparent outline-none text-secondary-darkgray1 font-medium text-[16px] scale-90 origin-left tracking-[-0.0175em] pl-[40px] mt-[1px]"
            />
            <button
              className="absolute right-4 top-2"
              onClick={() => handleUrlList()}
            >
              <AddIcon className="text-secondary-gray1 w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 유효성 검사 메시지 */}
        {invalid.status && (
          <div className="flex gap-1 h-5 items-center text-status-false font-medium tracking-[-0.0175em]">
            <WarningIcon />
            {invalid.message}
          </div>
        )}
      </div>

      {/* Toast */}
      <Toast
        toast={toastState.open}
        title={toastState.title}
        content={toastState.content}
        type={toastState.type}
        onClose={toastClose}
      />
    </div>
  );
};
