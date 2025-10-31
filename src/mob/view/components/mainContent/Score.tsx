import { scoreItems } from "@/mob/view/constants/scoreItem.ts";

interface ScoreProps {
  tIndex: number;
  qIndex: number;
  rIndex: number;
}

export const Score = ({tIndex, qIndex, rIndex} : ScoreProps) => {
  const values = [tIndex, qIndex, rIndex];

  return (
    <div className="w-full h-24 bg-white py-5 flex rounded-xl">
      {scoreItems.map((item, idx) => (
        <div key={idx} className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-center gap-1 text-secondary-darkgray3 text-[12px] tracking-[-.24px] font-bold">
            <item.icon className="w-4 h-4" />{item.title}
          </div>
          <p className="flex items-center justify-center gap-1 text-secondary-gray2 font-light tracking-[-.32px] h-8">
            <span className="text-[32px] text-primary-navy tracking-[-.64px]">
              {values[idx]}
            </span>
            {item.content}
          </p>
        </div>
      ))}
    </div>
  )
}