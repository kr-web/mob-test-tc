import TrashIcon from "@/assets/icons/common/trash.svg?react";

type UrlBoxProps = {
  item: { url: string; title?: string; state?: boolean };
  DeleteQuery?: () => void;
};

export const UrlBox = ({ item, DeleteQuery }: UrlBoxProps) => {
  return (
    <div
      key={item.url}
      className="flex justify-between w-full p-2 rounded-lg h-[60px] border border-secondary-gray0"
    >
      <div className="flex gap-2">
        <div className="flex justify-center items-center w-11 h-11 rounded-lg bg-primary-gray">
          <p className="text-secondary-darkgray3 font-md font-medium text-[12px] tracking-[-0.015em]">URL</p>
        </div>
        <div className="flex flex-col items-start justify-around gap-auto">
          <p className="text-[14px] text-secondary-darkgray3">{item.url}</p>
          <p className="text-[10px] text-secondary-gray1">{item.title}</p>
        </div>
      </div>
      <button
        className="w-10 h-full flex justify-center items-center"
        onClick={DeleteQuery}
      >
        <TrashIcon className="w-6 h-6 text-secondary-gray1"/>
      </button>
    </div>
  )
}