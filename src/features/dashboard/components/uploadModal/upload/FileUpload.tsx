import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import { GrayBox } from "../GrayBox";
import { Text } from "@/components/ui/Typography/Text";
import { Toast } from "@/components/toast/Toast";

import type { HandleFiles } from "@/types/UploadFiles";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useToast } from "@/hooks/useToast";

import Download from "@/assets/icons/dashboard/download.svg?react";

type fileUploadProps = {
  fileList: File[] | [];
  types: string[];
  itemAdd: HandleFiles["itemAdd"];
  currentTab: number;
};

export const FileUpload = ({ fileList, types, itemAdd, currentTab }: fileUploadProps) => {
  const [ loading, setLoading ] = useState<boolean>(false);
  const { toastState, toastOpen, toastClose } = useToast();
  const { handleChange } = useFileUpload({ fileList, toastOpen, itemAdd, currentTab, setLoading });

  return (
    <GrayBox className="w-[300px]">
      {loading && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30">
          <div className="loader">파일 업로드 중...</div>
        </div>
      )}
      <FileUploader
        multiple
        handleChange={handleChange}
        name="file"
        types={types}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-white p-4 mb-2">
            <Download className="h-6 w-6 text-secondary-gray1" />
          </div>
          <Text variant="body" className="text-primary-navy mb-1">
            클릭하거나 파일을 드래그하여 업로드하세요.
          </Text>
          <Text variant="title-sm" className="whitespace-pre-line text-secondary-gray1 mb-2">
            {`${types.join(", ")} 확장자 허용\n최대 50MB 지원`}
          </Text>
        </div>
      </FileUploader>

      <Toast
        toast={toastState.open}
        title={toastState.title}
        content={toastState.content}
        type={toastState.type}
        onClose={toastClose}
      />
    </GrayBox>
  );
};
