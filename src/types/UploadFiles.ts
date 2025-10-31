export type Files = {
  requirementsDoc: [];
  uiSpecDoc: [];
  sourceCode: [];
  referenceUrl: [];
  screenshots: [];
}

export type UploadFiles = {
  requirementsDoc: File[];
  uiSpecDoc: File[];
  sourceCode: File[];
  referenceUrl: { url: string; title?: string }[];
  screenshots: { file: File; img?: string }[];
};

type UploadType = keyof UploadFiles;

export type HandleFiles = {
  files?: UploadFiles;
  tempFiles?: UploadFiles;
  itemAdd: <T extends UploadType>(
    type: T,
    newItem: NonNullable<UploadFiles[T]>[number] | NonNullable<UploadFiles[T]>
  ) => void;
  hasNewData: () => boolean;
  itemResetAll: () => void;
  itemRemove: <T extends UploadType>(type: T, index: number) => void;
  itemReset: <T extends UploadType>(type: T) => void;
  itemActiveCopy: () => void;
}