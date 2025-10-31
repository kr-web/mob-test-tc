import { type Dispatch, type SetStateAction } from "react";

type QueryState = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleKeyDownSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ query, setQuery, handleKeyDownSearch }: QueryState) => {
  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="w-full relative flex flex-col justify-start items-center">
      <div className="w-full sticky top-0 bg-background z-10 pb-1">
        {/* SearchBar */}
        <div
          className="
        w-full h-[50px] flex items-center justify-end gap-[10px] px-4
        border-2 border-primary-blue rounded-[100px]
        bg-white
      "
        >
          {/* Input */}
          <input
            type="text"
            placeholder="전자상거래 로그인테스트케이스 뽑아줘"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDownSearch}
            className="flex-1 bg-transparent outline-none font-medium text-[16px] leading-[100%] tracking-[-0.02em] text-left placeholder:text-gray-400 placeholder:text-center
        "
          />
        </div>
      </div>
    </div>
  );
};
