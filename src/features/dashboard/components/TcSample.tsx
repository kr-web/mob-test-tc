import { tcListEx } from "@/features/tcEdit/constants/tcListEx";
import type { TcRow } from "@/features/tcEdit/types/TcRow";
import { useEffect, useState } from "react";
import { TableHeader } from "./table/TableHeader";
import { TcTable } from "@/components/common/table/TcTable";
import { TableColGroup } from "../../../components/common/table/TableColGroupNoChk";
import { Text } from "@/components/ui/Typography/Text";
import { Button } from "@/components/ui/button/Button";
import Edit from "@/assets/icons/common/edit.svg?react";
import { useNavigate } from "react-router-dom";
import { TableReadonlyRow } from "../../../components/common/table/TableReadonlyRow";
import { BackButton } from "@/components/ui/button/BackButton";

interface TcSampleProps {
  handleTcSample: (show: boolean) => void;
}

export const TcSample = ({ handleTcSample }: TcSampleProps) => {
  const navigate = useNavigate();
  const [tcList, setTcList] = useState<TcRow[]>([]);

  useEffect(() => {
    setTcList(tcListEx);
  }, []);

  return (
    <div className="mb-3 flex h-full w-full flex-col gap-4">
      <BackButton label="Generate" onClick={() => handleTcSample(false)} />

      <div className="mb-3 flex min-h-0 flex-1 flex-col gap-3.5 rounded-2xl bg-white p-4 dark:bg-primary-navy">
        <div className="flex flex-shrink-0 items-center justify-between">
          <Text
            variant="title-md"
            className="font-pretendardVar text-[#333333] dark:text-primary-gray"
          >
            로그인 성공/실패 케이스
          </Text>
          <Button
            variant="mini"
            className="gap-2 bg-secondary-darkgray3"
            onClick={() => navigate("/tcEdit")}
          >
            <Edit className="h-6 w-6 text-secondary-gray1" />
            <span className="text-sm font-semibold text-secondary-gray0">편집하기</span>
          </Button>
        </div>

        <div className="min-h-0 flex-1">
          <TcTable
            tcList={tcList}
            tableColGroup={<TableColGroup />}
            tableHeader={<TableHeader />}
            renderRow={(row) => <TableReadonlyRow key={row.id} tcRow={row} />}
          />
        </div>
      </div>
    </div>
  );
};
