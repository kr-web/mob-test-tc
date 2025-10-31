import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
// components
import { TestCase } from "../components/TestCase";
import { Pagination } from "@/components/ui/pagintaion/Pagination";
import { SummaryText } from "@/components/common/SummaryText";
import type { TcDetail } from "@/types/testcase";
import { useListController } from "@/hooks/useListController";

interface OutletContextType {
  setTitle: (t: string) => void;
}

interface PathType {
  path: number;
}

export default function SamplePage({ path }: PathType) {
  // =========================================================================================
  // ⚡ 더미 데이터 생성 (추후 삭제) --------------------------------------------------------------
  const [items] = useState<TcDetail[]>(
    Array.from({ length: 25 }, (_, i) => ({
      tcSeq: i,
      serviceName: `AD-로그인-${String(i + 1).padStart(3, "0")}`,
      testcaseName: `로그인 테스트 ${i + 1}`,
      priority: i % 3 === 0 ? "HIGH" : "LOW",
      precondition: `구매 내역이 있는 계정 로그인 상태`,
      testStep: `1. 화면 진입\n2. 입력\n3. 클릭 (${i + 1})`,
      expectedResult: `정상 로그인 처리 (예상결과 ${i + 1})`,
      checked: false,
    })) as TcDetail[],
  );

  // =========================================================================================
  // 상태관리 ----------------------------------------------------------------------------------
  const { setTitle } = useOutletContext<OutletContextType>();
  const {
    paginatedItems,
    currentPage,
    totalPages,
    handlePageChange,
    range,
    listRef,
    filteredItemCnt,
  } = useListController<TcDetail>(items);

  // 타이틀 설정 --------------------------------------------------------------------------------
  useEffect(() => {
    let title = "";
    if (path === 1) title = "인증/로그인/회원가입";
    else if (path === 2) title = "결제/정산";
    else if (path === 3) title = "상품 정보";
    else title = "샘플 페이지";

    setTitle(title);
  }, [path]);

  // 페이지 이동 시 선택 초기화 --------------------------------------------------------------------
  const resetPage = (page: number) => {
    handlePageChange(page);
  };

  return (
    <>
      <SummaryText tcLen={filteredItemCnt} />

      <div ref={listRef} className="scroll flex w-full flex-col gap-4 overflow-y-auto">
        {paginatedItems.map((item, index) => {
          const globalIndex = range.start + index;
          const isFifthItem = (globalIndex + 1) % 10 === 0;
          const isLast = globalIndex === items.length - 1;
          const addPadding = isFifthItem || isLast;

          return (
            <div key={item.tcSeq} className={addPadding ? "pb-20" : ""}>
              <TestCase item={item} />
            </div>
          );
        })}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={resetPage} />
    </>
  );
}
