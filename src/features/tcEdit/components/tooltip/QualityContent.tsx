import * as Tooltip from "@radix-ui/react-tooltip";
import { Text } from "@/components/ui/Typography/Text";
import { forwardRef } from "react";

export const QualityContent = forwardRef<HTMLDivElement>((props, ref) => (
  <Tooltip.Content
    side="top"
    sideOffset={6}
    className="flex w-[205px] flex-col gap-2 rounded-xl bg-primary-navy p-4"
  >
    <Text variant="title-sm" className="text-white">
      품질지수란?
    </Text>
    <div>
      <Text variant="mini" className="whitespace-pre-line text-secondary-gray2">
        {`[ 정성적 지표 ]
        명확성(Clarity),추적성(Traceability),실행가능성(Feasibility),
        효율성(Efficiency),완전성(Completeness),품질관리(Quality Control)`}
      </Text>
    </div>
    <Tooltip.Arrow className="fill-black" />
  </Tooltip.Content>
));
