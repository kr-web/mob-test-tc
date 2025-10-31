import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// components
import { Alarm } from "@/components/ui/alarm/Alarm";
import { Text } from "@/components/ui/Typography/Text";
import { MainContent } from "../components/mainContent/MainContent";
import { SidePanel } from "../components/SidePanel";
import { TcSample } from "../components/TcSample";
import { TcCountModal } from "../components/generateModal/TcCountModal";
import { UploadModal } from "../components/uploadModal/UploadModal";

// hooks
import { useModal } from "@/hooks/useModal";
import { useNavigationGuard } from "@/hooks/useNavigationGuard";
import { useTempFile } from "@/hooks/useTempFile";

// constants
import { sidePanelItems } from "../constants/sidePanelItems";
import { ConfirmModal } from "@/components/modal/ConfirmModal.tsx";
import type { UploadFiles } from "@/types/UploadFiles";
import { useGenerateTc } from "@/store/useGenerateTc";
import { Loading } from "@/components/common/loading/Loading";
import { useNavigate } from "react-router-dom";

const HEADER_HEIGHT_PX = "64px";

// Dashboard animation
const dashboardVariants = {
  initial: { x: "-100%", opacity: 0 },
  enter: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
};

// TcSample animation
const sampleVariants = {
  initial: { x: "100%", opacity: 0 },
  enter: {
    x: "0%",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
};

function DashboardPage() {
  // Sample
  const [showTcSample, setShowTcSample] = useState(false);

  // Upload
  const [prompt, setPrompt] = useState<string>("");
  const [tcCount, setTcCount] = useState<string>("50");
  const [currentTab, setCurrentTab] = useState(1);
  const [alarm, setAlarm] = useState<boolean>(false);
  const [files, setFiles] = useState<UploadFiles>({
    requirementsDoc: [],
    uiSpecDoc: [],
    sourceCode: [],
    referenceUrl: [],
    screenshots: [],
  });
  const { tempFiles, itemAdd, itemRemove, hasNewData, itemResetAll, itemReset, itemActiveCopy } =
    useTempFile({ files, setFiles });
  const safeTempFiles: UploadFiles = {
    requirementsDoc: tempFiles?.requirementsDoc ?? [],
    uiSpecDoc: tempFiles?.uiSpecDoc ?? [],
    sourceCode: tempFiles?.sourceCode ?? [],
    referenceUrl: tempFiles?.referenceUrl ?? [],
    screenshots: tempFiles?.screenshots ?? [],
  };
  const fileUpload = useModal();
  const fileUploadReset = useModal();

  const navigate = useNavigate();

  // Loading
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  // API
  const generateTc = useGenerateTc();
  const generate = useModal();

  // =========================================================================================
  // 기능 구현 ---------------------------------------------------------------------------------
  // 파일 생성 로딩 -----------------------------------------------------------------------------
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  // 샘플 페이지 Show ---------------------------------------------------------------------------
  const handleTcSample = (show: boolean) => {
    setShowTcSample(show);
  };

  // 파일 업로드 관련 ----------------------------------------------------------------------------
  const handleContentClick = (id: number) => {
    setCurrentTab(id);
    fileUpload.onOpen();
  };

  const handleMenuTab = (id: number) => {
    setCurrentTab(id);
  };

  // =========================================================================================
  // ACTION: 업로드 한 파일이 있는데, 파일 업로드 취소 버튼 클릭 시(취소하기) ---------------------------
  const uploadCancelAction = useCallback(() => {
    if (hasNewData()) {
      fileUploadReset.onOpen();
    } else {
      itemResetAll();
      fileUpload.onClose();
    }
  }, [fileUploadReset.onOpen, tempFiles, itemResetAll]);

  // ACTION: 파일 업로드 적용하기 클릭 시 ---------------------------------------------------------
  const uploadConfirmAction = useCallback(() => {
    itemActiveCopy();
    fileUpload.onClose();
  }, [itemActiveCopy]);

  // ACTION: Reset 모달에서 "초기화" 클릭 시 -----------------------------------------------------
  const fileUploadResetConfirmAction = useCallback(() => {
    itemReset("requirementsDoc");
    itemReset("uiSpecDoc");
    itemReset("sourceCode");
    itemReset("referenceUrl");
    itemReset("screenshots");

    fileUpload.onClose();
    fileUploadReset.onClose();
  }, [fileUploadReset.onClose, tempFiles, itemReset]);

  // API 생성 ----------------------------------------------------------------------------------
  const { mutate, isPending } = useGenerateTc();
  const handleGenerate = () => {
    console.log("----------------------------------------");
    mutate(
      { prompt, tcCount },
      {
        onSuccess: (res) => {
          console.log("#############", res);
          const newTcSeq = res.testCases.tcSeq;
          console.log("newTcSeq::::", newTcSeq);
          navigate(`/tcEdit/${newTcSeq}`);
        },
      },
    );
  };

  // 페이지 이탈 --------------------------------------------------------------------------------
  const hasUnsavedData = prompt !== "" || Object.values(files).some((arr) => arr.length > 0);
  const { isOpen, confirmLeave, onClose } = useNavigationGuard(hasUnsavedData);

  return (
    <>
      <AnimatePresence>
        {showTcSample ? (
          <motion.main
            key="tc-sample-view"
            variants={sampleVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute left-0 flex w-full items-start justify-center overflow-hidden"
            style={{ top: HEADER_HEIGHT_PX, height: `calc(100vh - ${HEADER_HEIGHT_PX})` }}
          >
            <div className="flex h-full w-[1134px] gap-4">
              <TcSample handleTcSample={handleTcSample} />
            </div>
          </motion.main>
        ) : (
          <motion.main
            key="dashboard-view"
            variants={dashboardVariants}
            initial={isInitialLoad ? false : "initial"}
            animate="enter"
            exit="exit"
            className="flex w-full items-center justify-center desktop:mb-16 desktop:h-[calc(100vh-64px)]"
          >
            <div className="flex gap-4">
              {/* Left Box */}
              <MainContent
                openGenModal={generate.onOpen}
                handleContentClick={handleContentClick}
                prompt={prompt}
                setPrompt={setPrompt}
                files={files}
              />

              {/* Right Box */}
              <div className="flex min-h-[600px] w-[414px] flex-col gap-4">
                <Text variant="body-md" className="text-secondary-darkgray3 dark:text-primary-gray">
                  카테고리별 TC 제안
                </Text>

                {sidePanelItems.map((item) => (
                  <SidePanel key={item.title} item={item} handleTcSample={handleTcSample} />
                ))}
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {generate.isOpen && (
        <TcCountModal
          isOpen={generate.isOpen}
          onClose={generate.onClose}
          onClick={handleGenerate}
          tcCount={tcCount}
          setTcCount={setTcCount}
        />
      )}

      {fileUpload.isOpen && (
        <UploadModal
          isOpen={fileUpload.isOpen}
          currentTab={currentTab}
          handleMenuTab={handleMenuTab}
          tempFiles={safeTempFiles}
          itemAdd={itemAdd}
          hasNewData={hasNewData}
          itemRemove={itemRemove}
          uploadCancelAction={uploadCancelAction}
          uploadConfirmAction={uploadConfirmAction}
        />
      )}

      {/* Confirm Modal */}
      {fileUploadReset.isOpen && (
        <ConfirmModal
          isOpen={fileUploadReset.isOpen}
          onClose={fileUploadReset.onClose}
          onConfirm={fileUploadResetConfirmAction}
          zIndex="z-[100]"
          title="경고"
          btnNm="초기화"
        >
          입력된 파일이 초기화됩니다.
          <br />
          그래도 취소하시겠습니까?
        </ConfirmModal>
      )}

      {isPending && <Loading />}

      {/* 페이지 이탈 감지 Modal */}
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          width="w-[420px]"
          onClose={onClose}
          onCancel={confirmLeave}
          onConfirm={onClose}
          title={`잠깐만요! 생성 중인 내용이 아직 있어요👀`}
          cancelNm="이동하기"
          btnNm="작성하기"
        >
          작성 중인 내용과 업로드한 파일이 저장되지 않았어요.
          <br />
          다른 화면으로 이동시 초기화됩니다.
          <br />
          진행 중이라면 마저 작성해 생성을 마무리해주세요.
        </ConfirmModal>
      )}

      {/* 부적절한 검색어에 대한 알람 */}
      <Alarm type="pc" active={alarm} setActive={setAlarm} />
    </>
  );
}

export default DashboardPage;
