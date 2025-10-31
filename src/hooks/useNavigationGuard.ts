import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/hooks/useModal";

export const useNavigationGuard = (hasUnsavedData: boolean) => {
  const navigate = useNavigate();
  const [nextLocation, setNextLocation] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useModal();

  // 이동 확정 시
  const confirmLeave = () => {
    if (nextLocation) {
      navigate(nextLocation);
    }
    setNextLocation(null);
    onClose();
  };

  // 클릭 가로채기
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // a 태그 이동
    const link = target.closest("a");
    if (link) {
      if (hasUnsavedData) {
        e.preventDefault();
        setNextLocation(link.getAttribute("href"));
        onOpen();
      }
      return;
    }

    // data-navigate 속성이 있는 버튼
    const btn = target.closest("[data-navigate]") as HTMLElement | null;
    if (btn) {
      const to = btn.getAttribute("data-navigate");
      if (!to) return;

      if (hasUnsavedData) {
        e.preventDefault();
        setNextLocation(to);
        onOpen();
      } else {
        navigate(to);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [hasUnsavedData]); // nextLocation 제거

  // 브라우저 탭 닫기 / 새로고침 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedData) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedData]);

  return { isOpen, confirmLeave, onClose };
};
