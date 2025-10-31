import type { HandleFiles, UploadFiles } from "@/types/UploadFiles";

interface uploadProps {
  fileList: File[] | [];
  toastOpen: (title: string, content: string, type: "Y" | "W" | "N") => void;
  itemAdd: HandleFiles['itemAdd'],
  currentTab: number;
  setLoading: (value:boolean) => void;
}

export const useFileUpload = ({ fileList, toastOpen, itemAdd, currentTab, setLoading }: uploadProps) => {
  const MAX_SIZE_MB = 50;

  const typeMap: Record<number, keyof UploadFiles> = {
    1: "requirementsDoc",
    2: "uiSpecDoc",
    3: "sourceCode",
    5: "screenshots",
  };

  const handleChange = async (files: File | File[] | FileList) => {
    try {
      // FileList일 경우 배열로 변환
      const selected = files instanceof FileList ? Array.from(files) : Array.isArray(files) ? files : [files];

      // 중복 체크
      const hasDuplicate = selected.some(file =>
        fileList.some(f => f.name === file.name && f.size === file.size)
      );

      if (hasDuplicate) {
        toastOpen("경고", "같은 파일은 이미 업로드되었습니다.", "N");
        return;
      }

      if (fileList.length + selected.length > 10) {
        toastOpen("경고", "최대 10개까지만 업로드할 수 있습니다.", "N");
        return;
      }

      const validFiles = selected.filter(file => {
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > MAX_SIZE_MB) {
          toastOpen("경고", "용량이 50MB를 초과한 파일이 있습니다.", "N");
          return false;
        }
        return true;
      });

      console.log("등록중");

      if (validFiles.length > 0) {
        await itemAdd(typeMap[currentTab], validFiles);
      }
    } finally {
      console.log("완!");
      setLoading(false);
    }
  };


  return { handleChange };
};
