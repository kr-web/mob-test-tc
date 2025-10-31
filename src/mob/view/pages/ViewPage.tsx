import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// components
import LoadTc from "../components/load/LoadTc";
import { Score } from "../components/mainContent/Score";
import { useListController } from "@/hooks/useListController";
import { SummaryText } from "@/components/common/SummaryText";
import { TestCase } from "@/mob/view/components/TestCase";
import { Pagination } from "@/components/ui/pagintaion/Pagination";
import type { TcDetail } from "@/types/testcase";

interface OutletContextType {
  setTitle: (t: string) => void;
}

export default function ViewPage() {
  // =========================================================================================
  // ⚡ 더미 데이터 생성 (추후 삭제) --------------------------------------------------------------
  const [items] = useState<TcDetail[]>(
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      tcId: `AD-로그인-${String(i + 1).padStart(3, "0")}`,
      serviceName: "로그인",
      tcName: `로그인 테스트 ${i + 1}`,
      priority: i % 3 === 0 ? "HIGH" : "LOW",
      testStep: `1. 화면 진입\n2. 입력\n3. 클릭 (${i + 1})`,
      preCondition: `구매 내역이 있는 계정 로그인 상태`,
      expectedResult: `정상 로그인 처리 (예상결과 ${i + 1})`,
    })) as TcDetail[],
  );

  // =========================================================================================
  // 상태관리 ----------------------------------------------------------------------------------
  const { id } = useParams<{ id: string }>();
  const { setTitle } = useOutletContext<OutletContextType>();
  const [showLoad, setShowLoad] = useState(true);
  const isNoId = !id;
  const {
    paginatedItems,
    currentPage,
    totalPages,
    handlePageChange,
    range,
    listRef,
    filteredItemCnt,
  } = useListController<TcItem>(items);

  // 상단 제목 세팅 ------------------------------------------------------------------------------
  useEffect(() => {
    setTitle("View Title");
  }, []);

  // 페이지 이동 시 선택 초기화 --------------------------------------------------------------------
  const resetPage = (page: number) => {
    handlePageChange(page);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {/* 테스트케이스 생성 진행 팝업 */}
      <AnimatePresence>
        {isNoId && showLoad && <LoadTc onComplete={() => setShowLoad(!showLoad)} />}
      </AnimatePresence>

      {/* 생성시간 ~ 신뢰도 */}
      <Score tIndex={2} qIndex={3.8} rIndex={3.8} />

      {/* 테스트케이스 총합 갯수 */}
      <div className="flex h-9 items-center gap-3 text-sm font-medium tracking-[-0.0175em] text-secondary-darkgray2">
        <SummaryText tcLen={filteredItemCnt} />
      </div>

      {/* 테스트케이스 리스트 */}
      <div ref={listRef} className="scroll flex w-full flex-col gap-4 overflow-y-auto">
        {paginatedItems.map((item, index) => {
          const globalIndex = range.start + index;
          const isFifthItem = (globalIndex + 1) % 10 === 0;
          const isLast = globalIndex === items.length - 1;
          const addPadding = isFifthItem || isLast;

          return (
            <div key={item.id} className={addPadding ? "pb-20" : ""}>
              <TestCase item={item} />
            </div>
          );
        })}
      </div>

      {/* 페이징 */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={resetPage} />
    </>
  );
}
