export interface TcList {
  tcSeq: number;
  name: string;
  date: string;
  url?: string;
  pinned: boolean;
  checked: boolean;
  isTrashed?: boolean;
}

export interface TcSummary {
  creationTime: string;
  qltyIndex: string;
  trust: string;
}

export interface TcDetail {
  tcSeq: number;
  serviceName: string;
  testcaseName: string;
  priority: string;
  precondition: string;
  testStep: string;
  expectedResult: string;
  checked: boolean;
}

export interface TcDetailResponse {
  testCases: TcSummary & {
    tcSeq: number;
    promtText: string;
    inputFilterReason: string;
    useYn: string;
  };
  testCasesDetail: (TcDetail & {
    platform: string;
    industry: string;
    functionCategory1: string;
    functionCategory2: string;
    functionCategory3: string;
    regUser: string | null;
    useYn: string;
  })[];
}
