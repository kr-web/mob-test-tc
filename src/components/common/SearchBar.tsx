import { InputText } from "@/components/ui/Typography/Input";
import { Search } from "lucide-react";

export const SearchBar = ({
  placeholder = "검색해주세요",
}: {
  placeholder?: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 bg-secondary-gray0 rounded-lg px-4 py-2.5 w-auto h-9 shadow-sm">
      <InputText
        variant="body"
        type="text"
        placeholder={placeholder}
        className="text-secondary-darkgray1 placeholder:text-secondary-darkgray1 bg-secondary-gray0 focus:outline-none"
      />
      <button className="w-6 h-6">
        <Search size={20} strokeWidth={3} className="text-secondary-gray1" />
      </button>
    </div>
  );
};
