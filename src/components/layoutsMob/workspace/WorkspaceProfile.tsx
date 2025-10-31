interface WorkspaceProfileProps {
  tcLength: number;
  tcTime: number;
}

export const WorkspaceProfile = ({ tcLength, tcTime } : WorkspaceProfileProps) => {
  return(
    <div
      className="flex w-full items-center justify-between h-[84px] bg-secondary-darkgray2 rounded-lg mt-8">
      <div className="flex flex-col items-center gap-1 w-[130px]">
        <p className="font-bold text-xs text-white tracking-[-2%]">
          생성한 TC
        </p>
        <p className="font-bold text-[28px] leading-[28px] tracking-[-2%] text-primary-green">
          {tcLength > 0 && '+'}{tcLength}
        </p>
      </div>
      <div className="flex flex-col items-center gap-1 w-[130px]">
        <p className="font-bold text-xs text-white tracking-[-2%]">
          평균 생성 시간
        </p>
        <p className="font-bold text-[28px] leading-[28px] tracking-[-2%] text-primary-green">
          {tcTime}s
        </p>
      </div>
    </div>
  )
}