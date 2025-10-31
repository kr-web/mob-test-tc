import { BaseModal } from "@/components/modal/BaseModal";
import { NumberSlider } from "./NumberSlider";
import { Text } from "@/components/ui/Typography/Text";
import { InputText } from "@/components/ui/Typography/Input";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

interface TcCountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  tcCount: string;
  setTcCount: Dispatch<SetStateAction<string>>;
}

export const TcCountModal = ({
  isOpen,
  onClose,
  onClick,
  tcCount,
  setTcCount,
}: TcCountModalProps) => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") return setTcCount("");

    let num = Number(val);
    if (isNaN(num) || num > 100 || num < 0) return;

    setTcCount(String(num));
  };

  // 입력이 멈춘 뒤 sliderVlaue 업데이트
  useEffect(() => {
    const handler = setTimeout(() => {
      if (tcCount === "") return;

      setSliderValue(Number(tcCount));
    }, 200);

    return () => clearTimeout(handler);
  }, [tcCount]);

  const handleSliderChange = (v: number[]) => {
    setSliderValue(v[0]);
    setTcCount(String(v[0]));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width="max-w-fit"
      title="테스트케이스 생성"
      btnNm="생성하기"
      onConfirm={onClick}
    >
      <div className="flex flex-col justify-between gap-2.5 overflow-hidden">
        <div className="grid w-[401px] grid-cols-3 items-center">
          <Text variant="body-lg" className="justify-self-start text-black">
            0
          </Text>
          <InputText
            variant="body"
            className="h-9 rounded-lg border border-primary-navy bg-primary-gray py-2.5 text-center text-secondary-darkgray3"
            min={0}
            max={100}
            value={tcCount}
            onChange={handleInputChange}
            placeholder="숫자를 입력해주세요"
          />
          <Text variant="body-lg" className="justify-self-end text-black">
            100
          </Text>
        </div>
        <NumberSlider value={[sliderValue]} onChange={handleSliderChange} />
      </div>
    </BaseModal>
  );
};
