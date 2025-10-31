import { useState } from "react";

import { WWW_URL_REGEX } from "@/types/regex.ts";
import { useIsMobile } from "./useIsMobile";

interface urlProps {
  query: string;
  urls: any[];
  toastOpen: (title: string, content: string, type: "Y" | "W" | "N") => void;
}

export const useFileUploadUrl = ({ query, urls, toastOpen }: urlProps) => {
  // =========================================================================================
  // 상태 관리 --------------------------------------------------------------------------------
  const [invalid, setInvalid] = useState<{ message: string; status: boolean }>({
    message: "",
    status: false,
  });

  const isMobile = useIsMobile();

  const addQuery = () => {
    // query에 값이 입력되지 않았을 때,
    if (query === "") {
      if (isMobile) {
        setInvalid({ message: "url을 입력하지 않았어요!", status: true });
      } else {
        toastOpen("경고", "url을 입력하지 않았어요!", "N");
      }
      return false;
    }

    // 입력된 query가 웹주소 형태가 아닐 때,
    if (!WWW_URL_REGEX.test(query)) {
      if (isMobile) {
        setInvalid({ message: "존재하지 않는 url이에요!", status: true });
      } else {
        toastOpen("경고", "존재하지 않는 url이에요!", "N");
      }
      return false;
    }

    // 입력된 query가 이미 등록된 url과 같을 때,
    const normalizedQuery = query.replace(/^www\./, ""); // www. 중복 방지
    const isDuplicate = urls.some(
      (item: any) => item.url.replace(/^www\./, "") === normalizedQuery,
    );

    if (isDuplicate) {
      if (isMobile) {
        setInvalid({ message: "중복된 url이에요!", status: true });
      } else {
        toastOpen("경고", "중복된 url이에요!", "N");
      }
      return false;
    }

    // 등록된 url이 10개 이상일 때,
    if (urls.length >= 10) {
      toastOpen("경고", "URL은 최대 10개까지 등록할 수\n 있습니다.", "N");
      return false;
    }

    setInvalid({ message: "", status: false });
    return true;
  };

  return {
    addQuery,
    invalid,
  };
};
