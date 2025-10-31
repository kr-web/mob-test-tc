import { FaClock } from "react-icons/fa6";
import { Text } from "../../ui/Typography/Text";
import Document from "@/assets/icons/loading/document-text.svg?react";
import BoxSearch from "@/assets/icons/loading/box-search.svg?react";
import Shield from "@/assets/icons/loading/shield-tick.svg?react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BeatColorLoaderDots } from "./BeatLoaderDots";
import { TcDisabledHeader } from "./TcDisabeldHeader";

export const Loading = () => {
  const [time, setTime] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const duration = 10000;
    const stepTime = 100;
    const step = 100 / (duration / stepTime);

    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  // ✅ 단계 계산
  const step = percent < 30 ? 1 : percent < 90 ? 2 : 3;

  const stepMotion = {
    initial: { opacity: 0.6, scale: 1 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.25, ease: "easeOut" },
  } as const;

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-primary-gray px-5">
      <TcDisabledHeader />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-6 w-fit items-center gap-1 rounded-[100px] bg-white px-3.5 py-2 text-primary-blue shadow-sm">
              <FaClock className="h-4 w-4" />
              <Text variant="menu-sm">생성 시간 {time}s...</Text>
            </div>

            <div className="flex gap-1">
              <Text variant="body-lg" className="text-primary-navy">
                테스트케이스 생성중입니다...
              </Text>
              <Text variant="body-lg" className="text-primary-blue">
                ({Math.floor(percent)}%)
              </Text>
            </div>
          </div>

          <div className="flex items-center justify-center">
            {/* STEP 1 */}
            <motion.div {...stepMotion} key={step === 1 ? "step1" : "idle1"}>
              <div className="flex w-[120px] flex-col items-center gap-2.5">
                <div className={`h-16 w-16 rounded-full bg-white p-4 shadow-md transition-colors`}>
                  <Document
                    className={`h-[30px] w-[30px] transition-colors ${step >= 1 ? "text-primary-blue" : "text-secondary-gray2"} `}
                  />
                </div>
                <Text
                  variant="menu-sm"
                  className={`${step >= 1 ? "text-secondary-darkgray1" : "text-secondary-gray1"}`}
                >
                  테스트케이스 생성중
                </Text>
              </div>
            </motion.div>

            <BeatColorLoaderDots color={step >= 1 ? "#016DFF" : "#B6B9CA"} size={4} gap={6} />

            {/* STEP 2 */}
            <motion.div {...stepMotion} key={step === 2 ? "step2" : "idle2"}>
              <div className="flex w-[120px] flex-col items-center gap-2.5">
                <div className={`h-16 w-16 rounded-full bg-white p-4 shadow-md transition-colors`}>
                  <BoxSearch
                    className={`h-[30px] w-[30px] transition-colors ${step >= 2 ? "text-primary-blue" : "text-secondary-gray2"}`}
                  />
                </div>
                <Text
                  variant="menu-sm"
                  className={`${step >= 2 ? "text-secondary-darkgray1" : "text-secondary-gray1"}`}
                >
                  품질 지수 메기는 중
                </Text>
              </div>
            </motion.div>

            <BeatColorLoaderDots color={step >= 2 ? "#016DFF" : "#B6B9CA"} size={4} gap={6} />

            {/* STEP 3 */}
            <motion.div {...stepMotion} key={step === 3 ? "step3" : "idle3"}>
              <div className="flex w-[120px] flex-col items-center gap-2.5">
                <div className={`h-16 w-16 rounded-full bg-white p-4 shadow-md transition-colors`}>
                  <Shield
                    className={`h-[30px] w-[30px] transition-colors ${step >= 3 ? "text-primary-blue" : "text-secondary-gray2"}`}
                  />
                </div>
                <Text
                  variant="menu-sm"
                  className={`${step === 3 ? "text-secondary-darkgray1" : "text-secondary-gray1"}`}
                >
                  신뢰도 확인하는 중
                </Text>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
