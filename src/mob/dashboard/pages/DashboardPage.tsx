import { useState} from "react";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// components
import { MainContent } from "../components/mainContent/MainContent";
import { SidePanel } from "../components/SidePanel";
import { BottomNav } from "../components/mainContent/BottomNav";
import { Count } from "../components/flowContent/Count";
import { Toast } from "@/components/toast/Toast";
import { ConfirmModal } from "@/components/modal/ConfirmModal";
import { Alarm } from "@/components/ui/alarm/Alarm";

// hooks
import { useToast } from "@/hooks/useToast";
import { useTempFile } from "@/hooks/useTempFile";
import { useNavigationGuard } from "@/hooks/useNavigationGuard";

// types
import type { BtmNavState, HandleBtmNav, UploadFiles } from "../constants/btmNavItems.ts";

interface OutletContextType {
  handleSidebar: (value: boolean) => void;
}

function DashboardPage() {
  // =========================================================================================
  // 상태 관리 --------------------------------------------------------------------------------
  const [ btmNavState, setBtmNavState] = useState<BtmNavState>({ open: false, tab: "A" });
  const handleBtmNav: HandleBtmNav = (partial) =>
    setBtmNavState((prev) => ({ ...prev, ...partial }));

  const [ countOpen, setCountOpen] = useState<boolean>(false);
  const { toastState, toastOpen, toastClose } = useToast();

  const [ query, setQuery] = useState<string>("");
  const queryState = { query, setQuery };
  const [files, setFiles] = useState<UploadFiles>({
    requirementsDoc: [],
    uiSpecDoc: [],
    sourceCode: [],
    referenceUrl: [],
    screenshots: [],
  });

  const { tempFiles, itemAdd, itemRemove, hasNewData, itemResetAll, itemReset, itemActiveCopy } = useTempFile({files, setFiles});

  const safeTempFiles: UploadFiles = {
    requirementsDoc: tempFiles?.requirementsDoc ?? [],
    uiSpecDoc: tempFiles?.uiSpecDoc ?? [],
    sourceCode: tempFiles?.sourceCode ?? [],
    referenceUrl: tempFiles?.referenceUrl ?? [],
    screenshots: tempFiles?.screenshots ?? [],
  };

  const [alarm, setAlarm] = useState<boolean>(false);
  // =========================================================================================
  // ACTION : 생성하기 -------------------------------------------------------------------------
  const handleSearch = () => {
    if (query === "") {
      toastOpen("경고", "검색어를 입력해 주세요", "N");
      return;
    }
    setCountOpen(true);
  };

  // 엔터 처리 ---
  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  // 페이지 이탈 --------------------------------------------------------------------------------
  const { handleSidebar } = useOutletContext<OutletContextType>();
  const hasUnsavedData = query !== "" || files.referenceUrl.length > 0 || files.screenshots.length > 0;
  const { isOpen, confirmLeave, onClose:guardClose } = useNavigationGuard(hasUnsavedData);

  /////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {/* 상단 메인 영역 */}
      <MainContent
        btmNavState={btmNavState}
        handleBtmNav={handleBtmNav}
        inputQuery={queryState}
        urlLength={files.referenceUrl.length}
        screenshotsLength={files.screenshots.length}
        handleKeyDownSearch={handleKeyDownSearch}
      />

      {/* 사이드 패널 */}
      <SidePanel />

      {/* 생성하기 버튼 */}
      <button
        onClick={handleSearch}
        className="fixed bottom-5 w-[calc(100%-40px)] h-[50px] rounded-[12px]
                   bg-secondary-darkgray1 text-white text-[18px] font-bold tracking-[.36px]"
      >
        생성하기
      </button>

      {/* 하단 네비게이션 */}
      <BottomNav
        btmNavState={btmNavState}
        handleBtmNav={handleBtmNav}
        tempFiles={safeTempFiles}
        itemAdd={itemAdd}
        hasNewData={hasNewData}
        itemResetAll={itemResetAll}
        itemRemove={itemRemove}
        itemReset={itemReset}
        itemActiveCopy={itemActiveCopy}
      />

      {/* 테스트케이스 개수 팝업 */}
      {countOpen && (
        <AnimatePresence>
          <Count
            prompt={query}
            urls={files.referenceUrl.map(({ url }) => ({ url }))}
            screenshots={files.screenshots.map(({ file }) => ({ file }))}
            setCountOpen={setCountOpen}
          />
        </AnimatePresence>
      )}

      {/* 토스트 메시지 */}
      <Toast
        toast={toastState.open}
        title={toastState.title}
        content={toastState.content}
        type={toastState.type}
        onClose={toastClose}
      />

      {/* Confirm Modal */}
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          width="w-[300px]"
          onClose={() => {
            guardClose();
            handleSidebar(false);
          }}
          onCancel={confirmLeave}
          onConfirm={() => {
            guardClose();
            handleSidebar(false);
          }}
          title={`잠깐만요!\n 생성 중인 내용이 아직 있어요👀`}
          cancelNm="이동하기"
          btnNm="작성하기"
        >
          작성 중인 내용과 업로드한 파일이 <br/>
          저장되지 않았어요.<br/>
          다른 화면으로 이동시 초기화됩니다.<br/><br/>
          진행 중이라면 마저 작성해<br/>
          생성을 마무리해주세요.
        </ConfirmModal>
      )}

      {/* 부적절한 검색어에 대한 알람 */}
      <Alarm type="mob" active={alarm} setActive={setAlarm} />
    </>
  );
}

export default DashboardPage;