import Trash from "@/assets/icons/common/trash.svg?react";
import { Text } from "@/components/ui/Typography/Text.tsx";
import { GrayBox } from "../../GrayBox.tsx";
import type { UploadFiles } from "@/types/UploadFiles.ts";

interface FileBoxProps {
  file: File;
  index: number;
  type: keyof UploadFiles;
  itemRemove: (type: keyof UploadFiles, index: number) => void;
}

export const FileBox = ({ file, index, type, itemRemove }: FileBoxProps) => {
  const handleRemove = () => itemRemove(type, index);

  const ext = file.name?.split(".").pop()?.toUpperCase() || "";

  return (
    <div className="flex h-[60px] items-center justify-between rounded-lg border border-secondary-gray0 bg-white p-2">
      <div className="flex gap-2">
        <GrayBox className="h-11 w-11">
          <Text variant="title-sm" className="text-secondary-darkgray3">
            {ext}
          </Text>
        </GrayBox>
        <div className="flex flex-col items-start justify-between py-1">
          <Text variant="body" className="text-secondary-darkgray3 truncate max-w-[150px]">
            {file.name}
          </Text>
          <Text variant="mini" className="text-secondary-gray1">
            {file.size > 1024 * 1024
              ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
              : `${(file.size / 1024).toFixed(1)} KB`}
          </Text>
        </div>
      </div>

      <button onClick={handleRemove} className="flex w-10 justify-center">
        <Trash className="h-6 w-6 text-secondary-gray1" />
      </button>
    </div>
  );
};
