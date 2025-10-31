import { useCallback, useState } from "react";

export type UploadFiles = {
  requirementsDoc: File[];
  uiSpecDoc: File[];
  sourceCode: File[];
  referenceUrl: { url: string; title?: string }[];
  screenshots: { file: File; img?: string }[];
};

type UploadType = keyof UploadFiles;

interface UseTempFileProps {
  files: UploadFiles;
  setFiles: React.Dispatch<React.SetStateAction<UploadFiles>>;
}

export const useTempFile = ({ files, setFiles }: UseTempFileProps) => {
  const [tempFiles, setTempFiles] = useState<UploadFiles>({
    requirementsDoc: [],
    uiSpecDoc: [],
    sourceCode: [],
    referenceUrl: [],
    screenshots: [],
  });

  // ------------------------ 공통 비교 함수 ------------------------
  // original : 현재 files 상태
  // temp : 임시 tempFiles 상태
  // keyFn : 항목 식별용 함수 (url, file.name, File.name 등)
  const mergeItems = <T>(original: T[], temp: T[], keyFn: (item: T) => string): T[] => {
    // temp에만 있는 항목 추가(added)
    // original에는 있고 temp에는 없는 항목 삭제(removed)
    // 삭제할 항목 제거 후 새로 추가된 항목 합치기
    const added = temp.filter((t) => !original.some((o) => keyFn(o) === keyFn(t)));
    const removed = original.filter((o) => !temp.some((t) => keyFn(t) === keyFn(o)));
    return [...original.filter((o) => !removed.includes(o)), ...added];
  };

  // ------------------------ itemAdd ------------------------
  // 공통된 타입(requirementsDoc ~ sourceCode)에 새 항목 추가[배열/단일 모두 처리 가능 // 여러 파일 업로드 경우 배열]
  const itemAdd = <T extends UploadType>(
    type: T,
    newItem: NonNullable<UploadFiles[T]>[number] | NonNullable<UploadFiles[T]>
  ) => {
    // 현재 tempFiles[type] 불러와서 단일 항목 추가 시 배열로 변환
    setTempFiles((prev) => {
      const prevItems = prev[type] ?? [];
      const toAdd = Array.isArray(newItem) ? newItem : [newItem];

      // tempFiles[type]에 새 항목 추가
      return { ...prev, [type]: [...prevItems, ...toAdd] };
    });
  };

  // ------------------------ itemRemove ------------------------
  // 특정 타입에서 인덱스로 항목 삭제(개별 삭제)
  const itemRemove = <T extends UploadType>(type: T, index: number) => {
    setTempFiles((prev) => ({ ...prev, [type]: (prev[type] || []).filter((_, i) => i !== index) }));
  };

  // ------------------------ itemReset ------------------------
  // 특정 타입 초기화 (파일 업로드 후 취소하기 or 모달 종료 시 초기화 이벤트 발생)
  // files에 있는 항목 남기고 tempFiles에서 새로 추가된 것만 제거
  const itemReset = <T extends UploadType>(type: T) => {
    setTempFiles(prev => {
      const originalItems = files[type] ?? [];
      return {
        ...prev,
        [type]: (prev[type] || []).filter(item => {
          const key = type === "referenceUrl"
            ? (item as any).url
            : type === "screenshots"
              ? (item as any).file.name
              : (item as File).name;
          return (originalItems as any[]).some(orig => {
            const origKey = type === "referenceUrl"
              ? (orig as any).url
              : type === "screenshots"
                ? (orig as any).file.name
                : (orig as File).name;
            return key === origKey;
          });
        })
      };
    });
  };

  // 새로운 데이터 추가된 것 체크
  // 데이터 추가하고 취소할 시 파악하기 위해
  const hasNewData = useCallback(() =>
    (["requirementsDoc","uiSpecDoc","sourceCode","referenceUrl","screenshots"] as UploadType[])
      .some(type => {
        const temp = tempFiles[type] || [];
        const original = files[type] || [];

        return temp.some(t => {
          if (type === "referenceUrl") {
            return !(original as { url: string; title?: string }[]).some(f => f.url === (t as { url: string }).url);
          } else if (type === "screenshots") {
            return !(original as { file?: File; img?: string }[]).some(
              f => f.file?.name === (t as { file?: File }).file?.name
            );
          } else {
            return !(original as File[]).some(
              f => f?.name === (t as File)?.name
            );
          }
        });
      }), [tempFiles, files]);


  // 새로 데이터 추가 된 상황에서 취소할 때
  // 원본 파일을 tempFile로 복사
  const itemResetAll = useCallback(() => {
    setTempFiles({...files});
  }, [files]);

  // ------------------------ itemActiveCopy (적용하기) ------------------------
  // tempFiles 변경 내용을 files에 반영
  // 복사본 생성 후 merge 처리
  const itemActiveCopy = () => {
    const newFiles: UploadFiles = { ...files };

    // 각 타입별 mergeItems(공통) 호출
    // 추가/삭제 모두 처리
    (Object.keys(tempFiles) as UploadType[]).forEach((type) => {
      const keyFn = (file: any) => {
        if (!file) return ""; // undefined 안전 처리
        if ("file" in file && file.file) return file.file.name || "";
        return file.name || "";
      };

      newFiles[type] = mergeItems(
        (files[type] || []) as any[],
        (tempFiles[type] || []) as any[],
        keyFn
      );
    });

    // files 업데이트 후 tempFiles 초기화
    // tempFiles files로 동기화 (복제)
    setFiles(newFiles);
    setTempFiles(newFiles);
  };

  return {
    tempFiles,
    itemAdd,
    itemRemove,
    hasNewData,
    itemResetAll,
    itemReset,
    itemActiveCopy,
  };
};
