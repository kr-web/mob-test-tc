import { useRef } from "react";

import { ScreenshotCard } from "./ScreenshotCard";
import { Toast } from "@/components/toast/Toast";
import { useToast } from "@/hooks/useToast";

import ImgIcon from "@/assets/icons/actionBar/add-img.svg?react";
import type { HandleFiles } from "../../../constants/btmNavItems.ts";

type ScreenshotProps = {
  screenshots: { file: File; img?: string }[];
  itemAdd: HandleFiles['itemAdd'];
  itemRemove: HandleFiles['itemRemove'];
}

export const Screenshot = ({ screenshots, itemAdd, itemRemove } : ScreenshotProps) => {
  // =========================================================================================
  // 상태관리 ----------------------------------------------------------------------------------
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toastState, toastOpen, toastClose } = useToast();

  // =========================================================================================
  // ACTION : 파일 선택 ------------------------------------------------------------------------
  // 파일 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(e.target.files ?? []);
    if (filesArray.length === 0) return;

    if (screenshots.length > 10) {
      toastOpen("경고", "스크린샷 이미지는 최대 10개까지 등록할 수 있습니다.", "N");
      return;
    }

    filesArray.forEach((file) => {
      itemAdd("screenshots",{ file : file, img: URL.createObjectURL(file) });
    });

    e.target.value = "";
  };

  // ACTION : 스크린샷 삭제 ---------------------------------------------------------------------
  const DeleteQuery = (index: number) => itemRemove("screenshots", index);

  ////////////////////////////////////////////////////////////////////////////////////////////
  return(
    <div className="mt-5 mb-3 w-full flex flex-col gap-5">
      <div className="overflow-y-auto w-full h-[456px] flex flex-wrap gap-2 pr-2 content-start scroll">
        {/* 추가된 스크린샷 */}
        {screenshots.map((item, index) => (
          <ScreenshotCard
            key={`${item.file.name}-${index}`}
            item={item}
            DeleteQuery={() => DeleteQuery(index)}
          />
        ))}

        {/* 추가 스크린샷 */}
        <div className="w-[102px] h-[102px] flex items-end" onClick={() => fileInputRef.current?.click()}>
          <div
            className="w-[92px] h-[92px] flex items-center justify-center bg-primary-gray rounded-lg border border-secondary-gray0">
            <ImgIcon className="text-secondary-gray1 w-6 h-6"/>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
        />
      </div>

      {/* 토스트 */}
      <Toast
        toast={toastState.open}
        title={toastState.title}
        content={toastState.content}
        type={toastState.type}
        onClose={toastClose}
      />
    </div>
  )
}