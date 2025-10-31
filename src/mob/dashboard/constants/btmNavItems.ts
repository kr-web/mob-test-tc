// BottomNav 상태 (On/Off)
export type BtmNavState = {
  open: boolean;
  tab: "A" | "B";
};

// File Uploads Type
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

export type HandleBtmNav = (partial: Partial<BtmNavState>) => void;

// BottomNav props
export type BottomNavProps = {
  btmNavState: BtmNavState;
  handleBtmNav: HandleBtmNav;
};

// MainContent Type
type QueryState = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export type MainContentProps = {
  btmNavState: BtmNavState;
  handleBtmNav: HandleBtmNav;
  inputQuery:QueryState;
  urlLength:number;
  screenshotsLength:number;
}