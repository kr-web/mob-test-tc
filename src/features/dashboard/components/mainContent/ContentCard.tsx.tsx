import { Text } from "@/components/ui/Typography/Text";
import type { SvgIconType } from "@/types/common";

export const ContentCard = ({
  item,
  onClick,
}: {
  item: { id: number; label: string; icon: SvgIconType; files: number };
  onClick: (id: number) => void;

}) => {
  const Icon = item.icon;
  return (
    <div
      className="flex h-[120px] w-[100px] flex-col justify-between rounded-lg bg-primary-gray px-[14px] py-4 shadow-sm hover:cursor-pointer dark:bg-secondary-darkgray2"
      onClick={() => onClick(item.id)}
    >
      <Icon className="h-6 w-6" />
      <div className="flex flex-col text-secondary-darkgray3 dark:text-primary-gray">
        <Text variant="menu-sm" className="tracking-[-0.05rem]">
          {item.label}
        </Text>
        {item.files === 0 ? (
          <Text variant="menu-sm" className="font-bold">
            업로드(0)
          </Text>
        ) : (
          <div className="flex items-center">
            <Text variant="menu-sm" className="font-bold">
              업로드
            </Text>
            <Text variant="menu-sm" className="!font-bold text-[#FF4501]">
              (+{item.files})
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
