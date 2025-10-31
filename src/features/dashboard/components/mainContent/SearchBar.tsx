import { type Dispatch, type SetStateAction } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({ prompt, setPrompt }: SearchBarProps) => {
  return (
    <div className="relative flex flex-col items-center justify-start">
      <div className="bg-background sticky top-0 z-10 pb-1">
        {/* SearchBar */}
        <div className="bg-background flex h-[50px] w-[500px] items-center gap-2.5 rounded-[100px] border border-secondary-gray1 px-8">
          <Search className="h-6 w-6 text-gray-400 dark:text-gray-500" />
          {/* Input */}
          <input
            type="text"
            placeholder="전자상거래 로그인테스트케이스 뽑아줘"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-transparent text-left text-[16px] font-medium leading-[100%] tracking-[-0.02em] outline-none placeholder:text-center placeholder:text-secondary-gray1"
          />
        </div>
      </div>
    </div>
  );
};
