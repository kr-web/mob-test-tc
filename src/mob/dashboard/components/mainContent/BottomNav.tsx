import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// components
import { ConfirmModal } from "@/components/modal/ConfirmModal";
import CloseIcon from "@/assets/icons/actionBar/close-nav.svg?react";
import { Url } from "../serveContent/url/Url";
import { Screenshot } from "../serveContent/screenshot/Screenshot";

// hooks & types
import { useModal } from "@/hooks/useModal.ts";
import type { BottomNavProps, HandleFiles, UploadFiles } from "../../constants/btmNavItems";

type BottomNavHandleFiles = {
  tempFiles: UploadFiles;
  itemAdd: HandleFiles['itemAdd'];
  itemRemove: HandleFiles['itemRemove'];
  itemResetAll: HandleFiles['itemResetAll'];
  itemReset: HandleFiles['itemReset'];
  itemActiveCopy: HandleFiles['itemActiveCopy'];
  hasNewData: HandleFiles['hasNewData'];
};

export const BottomNav = ({
                            btmNavState,
                            handleBtmNav,
                            tempFiles,
                            itemAdd,
                            hasNewData,
                            itemRemove,
                            itemResetAll,
                            itemReset,
                            itemActiveCopy,
                          }: BottomNavProps & BottomNavHandleFiles) => {
  // =========================================================================================
  // 상태 관리 --------------------------------------------------------------------------------
  const { isOpen, onOpen, onClose } = useModal();
  const [active, setActive] = useState<string>(btmNavState.tab);

  // =========================================================================================
  // 스크롤 차단 -------------------------------------------------------------------------------
  useEffect(() => {
    document.body.style.overflow = btmNavState.open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [btmNavState.open]);

  // 활성 탭 동기화 ---------------------------------------------------------------------------
  useEffect(() => {
    setActive(btmNavState.tab);
  }, [btmNavState.tab]);

  // =========================================================================================
  // ACTION: 닫기 버튼 클릭 시 ------------------------------------------------------------------
  const closeAction = useCallback(() => {
    if (hasNewData()) {
      onOpen();
    } else {
      handleBtmNav({ open: false, tab: "A" });
      itemResetAll();
    }
  }, [onOpen, tempFiles, itemResetAll]);

  // =========================================================================================
  // ACTION: 경고창에서 "초기화" 확정 시 ---------------------------------------------------------
  const confirmAction = useCallback(() => {
    itemReset("referenceUrl");
    itemReset("screenshots");

    onClose();
    setTimeout(() => {
      handleBtmNav({ open: false, tab: "A" });
    }, 50);
  }, [ onClose, tempFiles, itemReset ]);

  // =========================================================================================
  // ACTION: 적용하기 클릭 시 ---------------------------------------------------------------
  const moveBtmNav = useCallback(() => {
    itemActiveCopy();
    handleBtmNav({ open: false, tab: "A" });
  }, [itemActiveCopy, handleBtmNav]);

  // =========================================================================================
  // RENDER ----------------------------------------------------------------------------------
  return (
    <AnimatePresence>
      {btmNavState.open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Bottom Nav */}
          <motion.div
            initial={{ bottom: -601 }}
            animate={{ bottom: 0 }}
            exit={{ bottom: -601 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed left-0 bottom-0 z-50 w-full h-[601px] bg-white rounded-t-[12px] px-5 pt-[15px] pb-5"
          >
            {/* Close 버튼 */}
            <button
              onClick={closeAction}
              className="absolute -top-10 left-1/2 -translate-x-1/2 z-30"
            >
              <CloseIcon className="w-[34px] h-[34px]" />
            </button>

            {/* TAB */}
            <div className="flex items-center justify-center bg-primary-gray h-[45px] rounded-lg p-1">
              {["A", "B"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`w-1/2 h-[37px] ${
                    active === tab &&
                    "bg-white rounded-lg shadow-[0_0_4px_0_rgba(0,0,0,0.15)]"
                  }`}
                >
                  {tab === "A" ? "URL" : "스크린샷"}
                </button>
              ))}
            </div>

            {/* CONTENT  itemAdd,
                            itemRemove,*/}
            <div className="mt-3">
              {active === "A" ? (
                <Url
                  files={tempFiles}
                  itemAdd={itemAdd}
                  itemRemove={itemRemove}
                />
              ) : (
                <Screenshot
                  screenshots={(tempFiles.screenshots ?? [])}
                  itemAdd={itemAdd}
                  itemRemove={itemRemove}
                />
              )}
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-center gap-2 h-9 mt-2">
              <button
                onClick={closeAction}
                className="w-1/2 bg-primary-gray rounded-lg h-full text-secondary-gray2 font-semibold text-[14px]"
              >
                취소하기
              </button>
              <button
                onClick={moveBtmNav}
                className="w-1/2 bg-primary-navy rounded-lg h-full text-secondary-gray0 font-semibold text-[14px]"
              >
                적용하기
              </button>
            </div>
          </motion.div>

          {/* Confirm Modal */}
          {isOpen && (
            <ConfirmModal
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={confirmAction}
              title="경고"
              btnNm="초기화"
            >
              입력된 URL, 스크린샷이 초기화됩니다.
              <br />
              그래도 취소하시겠습니까?
            </ConfirmModal>
          )}
        </>
      )}
    </AnimatePresence>
  );
};
