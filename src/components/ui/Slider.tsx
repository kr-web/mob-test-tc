import { useEffect, useRef } from "react";

interface valueProps {
  sliderValue:number;
  setSliderValue: (value:number) => void;
  ActionTc:() => void;
}

export const Slider = ({sliderValue, setSliderValue, ActionTc} : valueProps) => {

  const sliderRef = useRef<HTMLInputElement>(null);

  // 슬라이더 변경 시
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  // 입력창 변경 시
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // 앞에 0 제거
    newValue = newValue.replace(/^0+/, "");
    const numberValue = Number(newValue);
    if (!isNaN(numberValue) && numberValue >= 0 && numberValue <= 100) {
      setSliderValue(numberValue);
    }
  };


  // +, - 입력 막기
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "+") {
      e.preventDefault();
    }
    if (e.key === "Enter"){
      ActionTc();
    }
  };

  // 진행 바 색 업데이트
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.background = `linear-gradient(to right, #2A2F4C ${sliderValue}%, #F1F4F7 ${sliderValue}%)`;
    }
  }, [sliderValue]);


  return(
    <div className="w-full flex flex-col gap-1 items-center">
      <div className="flex items-center justify-center gap-1 text-[18px] text-secondary-darkgray2 font-bold leading-normal tracking-[-.36px] my-1">
        <input
          type="text"
          min={0}
          max={100}
          value={sliderValue === 0 ? "0" : sliderValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-[65px] outline-none text-center py-[10px] rounded-xl border border-primary-navy bg-transparent text-[18px] text-secondary-darkgray2 font-bold leading-normal tracking-[-.36px]"
        />
        개
      </div>
      <div className="w-full h-9 mt-2">
        <input
          className="w-full range"
          ref={sliderRef}
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <div className="flex justify-between items-center mt-4 text-secondary-darkgray3 font-[14px] tracking-[-.28px] ">
          <p className="ml-[14px]">0</p>
          <p className="mr-[6px]">100</p>
        </div>
      </div>
    </div>
  )
}