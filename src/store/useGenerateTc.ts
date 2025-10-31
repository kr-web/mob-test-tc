import { generateTc } from "@/api/testcaseApi";
import type { TcDetail, TcDetailResponse, TcList, TcSummary } from "@/types/testcase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGenerateTc = () => {
  const queryClient = useQueryClient();

  return useMutation<TcDetailResponse, Error, { prompt: string; tcCount: string }>({
    // mutationKey: testcaseKeys.generate()
    mutationFn: ({ prompt, tcCount }) => generateTc(prompt, tcCount),

    onSuccess: (res: TcDetailResponse) => {
      const { testCases, testCasesDetail } = res;
      const newTcSeq = testCases.tcSeq;

      const { creationTime, qltyIndex, trust, ...rest } = testCases;
      const tcSummary = { creationTime, qltyIndex, trust };

      queryClient.setQueryData<{ summary: TcSummary; list: TcDetail[] }>(["tcDetail", newTcSeq], {
        summary: tcSummary,
        list: testCasesDetail,
      });

      // const newListItem: TcList = rest;
      // queryClient.setQueryData<TcList[]>(["tcList"], (oldList = []) => [...oldList, newListItem]);

      console.log("✅ TC 생성 완료:", newTcSeq);
      console.log("ℹ️ 생성된 TC 결과:", res);
    },
    onError: (err) => {
      console.error("tc 생성 실패", err);
    },
  });
};
