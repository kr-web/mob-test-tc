import { useState, useCallback, useRef } from "react";

export type ToastType = "Y" | "N" | "I" | "W";

export const useToast = () => {
  const [toastState, setToastState] = useState<{
    open: boolean;
    title: string;
    content: string;
    type: ToastType;
  }>({ open: false, title: "", content: "", type: "Y" });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toastOpen = useCallback((title: string, content: string, type: ToastType = "Y") => {
    // 기존 타이머 있으면 클리어
    if (timerRef.current) clearTimeout(timerRef.current);

    setToastState({ open: true, title, content, type });

    // 3초 후 자동 닫기
    timerRef.current = setTimeout(() => {
      setToastState(prev => ({ ...prev, open: false }));
      timerRef.current = null;
    }, 3000);
  }, []);

  const toastClose = useCallback(() => {
    // 사용자가 닫으면 타이머 클리어
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToastState(prev => ({ ...prev, open: false }));
  }, []);

  return { toastState, toastOpen, toastClose };
};
