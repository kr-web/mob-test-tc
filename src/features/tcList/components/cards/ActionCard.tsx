import { Text } from "@/components/ui/Typography/Text";
import AddBox from "@/assets/icons/tcList/btn/add-box.svg?react";
import { Link } from "react-router-dom";
import type { LinkActionItem } from "@/types/CardItem";

export const ActionCard = ({ item }: { item: LinkActionItem }) => {
  const Icon = item.icon;
  const isDisabled = item.link === "disabled";

  return (
    <Link
      to={isDisabled ? "#" : item.link}
      aria-disabled={isDisabled}
      className={`${isDisabled && "cursor-default"} justify-between rounded-xl border-secondary-gray0 bg-white p-4 shadow-sm transition-shadow hover:bg-secondary-gray0 dark:border-transparent dark:bg-primary-navy`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-secondary-gray0 bg-primary-gray dark:border-transparent dark:bg-primary-gray/20">
          <Icon className="h-6 w-6 text-secondary-gray1 dark:text-primary-gray" />
        </div>
        <div className="flex flex-col gap-1">
          <h3
            className={`text-sm font-semibold ${isDisabled ? "text-secondary-gray2 dark:text-secondary-darkgray3" : "text-secondary-darkgray3 dark:text-primary-gray"}`}
          >
            {item.title}
          </h3>
          <Text
            variant="title-sm"
            className={`${isDisabled ? "text-secondary-gray2 dark:text-secondary-darkgray3" : "text-secondary-gray1"}`}
          >
            {item.label}
          </Text>
        </div>
        <AddBox
          className={`ml-auto h-6 w-6 ${isDisabled ? "text-secondary-gray0" : "text-secondary-gray1 dark:text-primary-gray"}`}
        />
      </div>
    </Link>
  );
};
