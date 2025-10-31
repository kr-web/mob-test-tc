import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

type ListSearchProps = {
  searchQuery: string;
  handleSearchQuery: (value: string) => void;
};

export const ListSearch = ({ searchQuery, handleSearchQuery }: ListSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const isSearched = searchQuery.trim().length > 0;

  // 검색 실행
  const handleSearch = () => {
    handleSearchQuery(inputValue);
  };

  // 검색(enter key)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // 검색 취소
  const handleReset = () => {
    setInputValue("");
    handleSearchQuery("");
  };

  return (
    <div className="flex items-center justify-between gap-[5px]">
      {isSearched && (
        <button className="top-1 h-6 w-6" onClick={handleReset}>
          <ArrowLeft className="h-6 w-6 text-secondary-gray1" />
        </button>
      )}
      <div className="flex h-9 w-full items-center justify-between gap-2 rounded-lg bg-secondary-gray0 px-4 py-[10px] shadow-sm">
        <input
          type="text"
          placeholder="검색어를 입력해주세요!"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full origin-left scale-90 bg-secondary-gray0 text-[16px] text-secondary-darkgray1 placeholder:text-secondary-darkgray1 focus:outline-none"
        />
        <button className="h-4 w-4" onClick={handleSearch}>
          <Search className="h-6 w-6 text-secondary-gray1" />
        </button>
      </div>
    </div>
  );
};
