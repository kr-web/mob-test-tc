import * as Tooltip from "@radix-ui/react-tooltip";
import { Text } from "@/components/ui/Typography/Text";
import { forwardRef } from "react";

export const JudgeContent = forwardRef<HTMLDivElement>((props, ref) => (
  <Tooltip.Content
    ref={ref}
    side="top"
    sideOffset={6}
    className="flex w-[205px] flex-col gap-2 rounded-xl bg-primary-navy p-4"
    {...props}
  >
    <Text variant="title-sm" className="whitespace-pre-line text-white">
      {`신뢰도 점수란?
      ( LLM as Judge )`}
    </Text>
    <div>
      <Text variant="mini" className="whitespace-pre-line text-secondary-gray2">
        {`[ 정성적 지표 ]
        명확성(Clarity),추적성(Traceability),실행가능성(Feasibility),
        효율성(Efficiency),완전성(Completeness),품질관리(Quality Control)

        [ 실무 적용 지표]
        현실성(Practicality),유지보수성(Maintainability),비즈니스가치(Business Value),
        협업성(Collaboration),지속가능성(Sustainability)`}
      </Text>
    </div>
    <Tooltip.Arrow className="fill-black" />
  </Tooltip.Content>
));
