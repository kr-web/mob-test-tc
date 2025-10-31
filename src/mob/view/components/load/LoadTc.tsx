import { useState, useEffect } from "react";

import { MobFlowLayout } from "@/components/layoutsMob/layout/MobFlowLayout.tsx";
import { LoadContent } from "./LoadContent";

import Load from "@/assets/icons/loading/clock.svg?react";

interface LoadPageProps {
  onComplete?: () => void; // 완료 콜백
}

function LoadTc({ onComplete }: LoadPageProps){
  // =========================================================================================
  // 상태관리 ----------------------------------------------------------------------------------
  const [time, setTime] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const [completed, setCompleted] = useState(false);

  // 보여지는 시간 설정 --------------------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // completed 처리  --------------------------------------------------------------------------
  useEffect(() => {
    const duration = 10000;
    const stepTime = 100;
    const step = 100 / (duration / stepTime);

    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          setCompleted(true); // ✅ 여기서 직접 onComplete 호출하지 않음
          return 100;
        }
        return next;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  // 렌더링 이후(onComplete 실행 타이밍 제어) -------------------------------------------------------
  useEffect(() => {
    if (completed && onComplete) {
      onComplete();
    }
  }, [completed, onComplete]);

  return(
    <MobFlowLayout skipStart={true} disableExit={false}>
      <div className="flex flex-col gap-[120px]">
        <div className="flex flex-col gap-3">
          <div
            className="py-2 px-[14px] w-auto max-w-[140px] h-6 bg-white rounded-[100px] flex items-center justify-center text-primary-blue text-[14px] gap-1">
            <Load className="text-white" />생성시간 {time}s...
          </div>
          <div className="flex flex-col">
            <p className="text-[20px] font-bold leading-normal tracking-[-.4px] text-primary-navy">
              테스트케이스 생성중입니다...
            </p>
            <p className="text-[20px] font-bold leading-normal tracking-[-.4px] text-primary-blue">
              ({Math.floor(percent)}%)
            </p>
          </div>
        </div>

        {/* 테스트케이스 생성중 ~ 신뢰도 확인하는 중*/}
        <LoadContent />
      </div>
    </MobFlowLayout>
  )
}

export default LoadTc;