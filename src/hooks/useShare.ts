type ToastType = (title: string, content: string, type: "Y" | "W" | "N") => void;

export const useShare = (url: string, toastOpen: ToastType) => {
  const shareAction = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toastOpen("복사 완료", "링크 복사 완료했습니다.", "Y");
    } catch (e) {
      toastOpen("경고", "링크 복사 실패했습니다.", "W");
    }
  };

  return { shareAction };
};
