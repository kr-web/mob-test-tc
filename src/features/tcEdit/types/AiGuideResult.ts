export type AiGuideResultStatus = "success" | "fail" | "collapsed";

export interface AiGuideResult {
  id: number;
  line: number;
  result: AiGuideResultStatus;
  reference?: string;
}

export interface AiGuideResultProps {
  line: number;
  items: AiGuideResult[];
}
