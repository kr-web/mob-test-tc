import { FileBox } from "./FileBox"
import { FileUpload } from "../../upload/FileUpload";

import type { HandleFiles, UploadFiles } from "@/types/UploadFiles";

type FileContentTypes = {
  files: UploadFiles;
  itemAdd: HandleFiles['itemAdd'];
  itemRemove: HandleFiles['itemRemove'];
  currentTab: number;
}

export const FileContent = ({ files, itemAdd, itemRemove, currentTab }: FileContentTypes) => {
  const fileTypes = currentTab === 1 || currentTab === 2
    ? ["PDF", "DOCX", "DOC", "HWP", "HWPX", "PPT"]
    : currentTab === 3
      ? ["ZIP"]
      : currentTab === 5
        ? ["JPG", "PNG", "BMP", "TIFF", "SVG", "GIF"]
        : [];

  const typeMap: Record<number, keyof UploadFiles> = {
    1: "requirementsDoc",
    2: "uiSpecDoc",
    3: "sourceCode",
    5: "screenshots",
  };

  const currentType = typeMap[currentTab];
  const fileList = (files[currentType] || []) as File[];

  return (
    <div className="flex h-[346px] gap-2.5">
      <FileUpload
        fileList={fileList}
        types={fileTypes}
        itemAdd={itemAdd}
        currentTab={currentTab}
      />
      <div className="scroll flex h-[332px] min-w-[278px] flex-col gap-2 overflow-y-auto pr-2">
        {fileList.map((file, idx) => (
          <FileBox
            key={idx}
            file={file as File}
            index={idx}
            type={currentType}
            itemRemove={itemRemove}
          />
        ))}
      </div>
    </div>
  );
};
