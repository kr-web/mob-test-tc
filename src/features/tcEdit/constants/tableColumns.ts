import type { TcDetail } from "@/types/testcase";

export interface TableColumnConfig {
  key: keyof TcDetail;
  align?: "left" | "center";
  pinLevel?: 1 | 2 | 3;
}

export const tableColumns: readonly TableColumnConfig[] = [
  { key: "tcSeq", align: "center", pinLevel: 1 },
  { key: "serviceName", align: "center", pinLevel: 2 },
  { key: "testcaseName", align: "center", pinLevel: 3 },
  { key: "priority", align: "center" },
  { key: "precondition", align: "left" },
  { key: "testStep", align: "left" },
  { key: "expectedResult", align: "left" },
] as const;
