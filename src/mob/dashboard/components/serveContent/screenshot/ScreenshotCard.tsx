import TrashIcon from "@/assets/icons/common/trash.svg?react";

type ScreenshotCardProps = {
  item: { file: File; img?: string; };
  DeleteQuery?: () => void;
};

export const ScreenshotCard = ({ item, DeleteQuery }: ScreenshotCardProps) => {
  return(
    <div
      className="w-[102px] h-[102px] flex items-end relative z-50"
    >
      <div
        className="w-[92px] h-[92px] flex items-center justify-center bg-primary-gray rounded-lg border border-secondary-gray0">
        {item.img ? (
          <img src={item.img} alt={item.img} className="w-full h-full object-cover" />
        ) : (
          <p className="text-secondary-darkgray3 font-md text-[12px] tracking-[-0.015em]">IMG</p>
        )}
      </div>
      <button
        className="absolute top-0 right-0 w-6 h-6 bg-primary-navy rounded-[100px] flex justify-center items-center"
        onClick={DeleteQuery}
      >
        <TrashIcon className="w-[18px] h-[18px] text-secondary-gray0"/>
      </button>
    </div>
  )
}