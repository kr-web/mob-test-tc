import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MobFlowLayout } from "@/components/layoutsMob/layout/MobFlowLayout.tsx";
import { Slider } from "@/components/ui/Slider";
import { Toast } from "@/components/toast/Toast";
import { useToast } from "@/hooks/useToast";
// import { useGenerateTc } from "@/hooks/query/useGenerateTc";

import CloseIcon from "@/assets/icons/actionBar/close.svg?react-no-replace";

interface CountProps {
  prompt: string;
  urls: { url: string; title?: string }[];
  screenshots: { file: File; img?: string }[];
  disableExit?: boolean;
  setCountOpen: (value: boolean) => void;
}

export const Count = ({ prompt, urls, screenshots, setCountOpen }: CountProps) => {
  // =========================================================================================
  // 상태관리 ----------------------------------------------------------------------------------
  const [count, setCount] = useState<number>(50);
  const navigate = useNavigate();
  const { toastState, toastOpen, toastClose } = useToast();
  // const generateTc = useGenerateTc();

  // =========================================================================================
  // 생성하기 ----------------------------------------------------------------------------------
  const ActionTc = () => {
    if (count === 0) {
      toastOpen("경고", "생성 개수를 설정해주세요.", "N");
    } else {
      console.log(prompt, urls, screenshots, count);
      const tcCount = String(count);
      // generateTc.mutate({ prompt, tcCount});
      navigate("/view", { replace: true });
    }
  };

  return (
    <MobFlowLayout disableExit={false} skipStart={false}>
      <button className="fixed right-4 top-4" onClick={() => setCountOpen(false)}>
        <CloseIcon className="h-[34px] w-[34px]" />
      </button>
      <div className="flex flex-col gap-[120px]">
        <div className="flex flex-col">
          <p className="whitespace-pre-line text-[20px] font-bold leading-normal tracking-[-.4px] text-primary-navy">
            테스트케이스{"\n"}몇 개 생성할까요?
          </p>
        </div>

        <div className="flex justify-center">
          <Slider sliderValue={count} setSliderValue={setCount} ActionTc={ActionTc} />
        </div>
      </div>

      <button
        className="fixed bottom-5 h-[50px] w-[calc(100%-60px)] rounded-[12px] bg-secondary-darkgray1 text-[18px] font-bold tracking-[.36px] text-white"
        onClick={ActionTc}
      >
        생성하기
      </button>

      {/* 토스트 */}
      <Toast
        toast={toastState.open}
        title={toastState.title}
        content={toastState.content}
        type={toastState.type}
        onClose={toastClose}
      />
    </MobFlowLayout>
  );
};
