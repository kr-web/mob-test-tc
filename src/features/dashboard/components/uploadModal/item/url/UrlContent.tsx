import { InputText } from "@/components/ui/Typography/Input.tsx";
import { UrlBox } from "./UrlBox.tsx";
import type { HandleFiles, UploadFiles } from "@/types/UploadFiles.ts";
import { useState } from "react";
import { useToast } from "@/hooks/useToast.ts";
import { useFileUploadUrl } from "@/hooks/useFileUploadUrl.ts";
import { Toast } from "@/components/toast/Toast.tsx";
import { Button } from "@/components/ui/button/Button.tsx";

type UrlContentTypes = {
  files: UploadFiles;
  itemAdd: HandleFiles["itemAdd"];
  itemRemove: HandleFiles["itemRemove"];
};

export const UrlContent = ({ files, itemAdd, itemRemove }: UrlContentTypes) => {
  const [query, setQuery] = useState<string>("");
  const { toastState, toastOpen, toastClose } = useToast();
  const { addQuery } = useFileUploadUrl({ query, urls: files.referenceUrl ?? [], toastOpen });

  // =========================================================================================
  // ACTION : URL 추가 ------------------------------------------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUrlList();
    }
  };

  const handleUrlList = () => {
    const isValid = addQuery();
    if (!isValid) return;

    toastClose();
    itemAdd("referenceUrl", { url: "www." + query, title: "title" });
    setQuery("");
  };

  // ACTION : URL 삭제 ------------------------------------------------------------------------
  const DeleteQuery = (index: number) => itemRemove("referenceUrl", index);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="relative flex gap-1">
        <p className="absolute left-5 top-[11px] text-[14px] font-medium tracking-[-0.0175em] text-secondary-darkgray1">
          www.
        </p>
        <InputText
          variant="body"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg border border-primary-navy bg-primary-gray px-[55px] py-1.5 text-[14px]"
        />
        <Button
          variant="mini"
          className="w-[80px] bg-primary-navy text-sm font-semibold text-secondary-gray0"
          onClick={() => handleUrlList()}
        >
          적용하기
        </Button>
      </div>

      <div className="scroll scroll flex h-[300px] flex-col gap-2 overflow-y-auto pr-2">
        {(files.referenceUrl ?? []).map((item, index) => (
          <UrlBox key={`${item.url}-${index}`} item={item} DeleteQuery={() => DeleteQuery(index)} />
        ))}
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
