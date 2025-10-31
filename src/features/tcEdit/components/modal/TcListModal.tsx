import { Button } from "@/components/ui/button/Button";
import { Text } from "@/components/ui/Typography/Text";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/common/SearchBar";
import { TcListModalItem } from "./TcListModalItem";

export const TcListModal = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[340px] flex-col gap-2 rounded-xl bg-white p-3 shadow-soft-md">
      <SearchBar placeholder="테스트케이스 목록 검색" />

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <Text variant="body" className="text-secondary-gray2">
          테스트케이스 목록
        </Text>

        <div className="scroll flex flex-col gap-2 overflow-y-auto pr-1">
          {[...Array(20)].map((_, index) => (
            <TcListModalItem key={index} />
          ))}
        </div>
      </div>

      <Button
        variant="mini"
        className="w-[358px] bg-primary-navy"
        onClick={() => navigate("/tcList")}
      >
        <span className="text-sm font-semibold text-secondary-gray0">테스트케이스 리스트</span>
      </Button>
    </div>
  );
};
