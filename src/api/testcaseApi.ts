import { api } from "@/libs/axios";
import type { TcDetailResponse } from "@/types/testcase";

export const generateTc = async (prompt: string, cnt: string): Promise<TcDetailResponse> => {
  const encoded = encodeURIComponent(prompt);
  const res = await api.get<TcDetailResponse>(`/api/v1/testcase/getTestcases`, {
    params: { prompt: encoded, cnt },
  });

  console.log("🔍 요청 URL:", res.config.baseURL + res.config.url);
  console.log("🔍 요청 params:", res.config.params);

  return res.data;
};
