import { QualityContent } from "../components/tooltip/QualityContent";
import { JudgeContent } from "../components/tooltip/JudgeContent";

import Clock from "@/assets/icons/common/clock.svg?react-no-replace";
import BoxSearch from "@/assets/icons/loading/box-search.svg?react";
import Shield from "@/assets/icons/loading/shield-tick.svg?react";
import type { TcSummary } from "@/types/testcase";
import type { SvgIconType } from "@/types/common";

export interface SummaryItem {
  icon: SvgIconType;
  title: string;
  label: string;
  value: string;
  unit: string;
  isScore: boolean;
  tooltip?: React.ComponentType;
}

export const getSummaryItems = (tcSummary: TcSummary) => {
  const { creationTime, qltyIndex, trust } = tcSummary;
  return [
    {
      icon: Clock,
      title: "생성시간",
      label: "TC 결과가 생성되기까지\n소요시간",
      value: creationTime ?? "-",
      unit: "s",
      isScore: false,
    },
    {
      icon: BoxSearch,
      title: "품질 지수",
      label: "ISO 29119기반의 정성적 지표\n6가지 항목으로 측정(5점 만점)",
      value: qltyIndex ?? "-",
      unit: "/5.0",
      isScore: true,
      tooltip: QualityContent,
    },
    {
      icon: Shield,
      title: "신뢰도",
      label: "ISO 29119기반의 정성적 지표\n6가지 항목으로 측정(5점 만점)",
      value: trust ?? "-",
      unit: "/5.0",
      isScore: true,
      tooltip: JudgeContent,
    },
  ];
};
