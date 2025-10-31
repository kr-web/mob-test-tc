import { Text } from "@/components/ui/Typography/Text";
import clsx from "clsx";

interface DefaultProfileProps {
  name: string;
  src?: File | null;
  size: "sm" | "lg";
}

export const DefaultProfile = ({ name, src, size }: DefaultProfileProps) => {
  const dimensions = size === "sm" ? "w-8 h-8" : "w-20 h-20";
  const textVariant = size === "sm" ? "body-md" : "title-lg";

  return (
    <div className={clsx("relative flex items-center justify-center", dimensions)}>
      {
        src ?
          <div className={clsx("rounded-full flex items-center justify-center", dimensions)}>
            <img
              src={URL.createObjectURL(src)}
              alt="profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          :
          <div className={clsx("bg-[#c0fddc] rounded-full flex items-center justify-center", dimensions)}>
            <Text variant={textVariant} className="text-primary-navy select-none">
              {name}
            </Text>
          </div>
      }
    </div>
  );
};
