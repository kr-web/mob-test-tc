import { Button } from "@/components/ui/button/Button";
import { Text } from "@/components/ui/Typography/Text";
import { AnimatePresence, motion } from "framer-motion";
import { Link2 } from "lucide-react";
import Download from "@/assets/icons/tcEdit/modal/document-download.svg?react";
import Package from "@/assets/icons/tcEdit/modal/document-package.svg?react";
import { tableHeaders } from "../../constants/tableHeader";
import { tcListEx } from "../../constants/tcListEx";
import { CloseButton } from "@/components/ui/button/CloseButton";
import { tableColumns } from "../../constants/tableColumns";

export const PreviewModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 text-center">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-primary-gray/80"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative z-50 flex h-auto flex-col gap-3 rounded-lg bg-white px-4 py-4 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex h-[61px] items-center justify-between gap-2 rounded-lg border border-secondary-gray0 bg-white p-3">
                <div className="flex flex-col">
                  <div className="flex gap-1 text-secondary-gray1">
                    <Link2 className="h-4 w-4" strokeWidth={1.5} />
                    <span className="text-[10px] font-semibold leading-[13px]">링크 공유</span>
                  </div>
                  <Text variant="body" className="text-secondary-darkgray3">
                    http://testcase.sample.co.kr..
                  </Text>
                </div>
                <button>
                  <Package className="h-6 w-6 text-secondary-gray2" />
                </button>
              </div>

              {/* button group */}
              <div className="flex items-start gap-2">
                <Button
                  variant="mini"
                  className="gap-2 bg-secondary-darkgray3 text-secondary-gray0"
                >
                  <Download className="h-6 w-6 text-secondary-gray0" />
                  <span className="text-sm font-semibold">CSV code 다운로드</span>
                </Button>
                <Button variant="mini" className="bg-secondary-darkgray3 text-secondary-gray0">
                  <Download className="h-6 w-6 text-secondary-gray0" />
                  <span className="text-sm font-semibold">Excel 다운로드</span>
                </Button>
                <CloseButton onClose={onClose} />
              </div>
            </div>

            {/* Content */}
            <div className="scroll h-[524px] overflow-y-auto overflow-x-hidden">
              <div className="w-[70vw] rounded-md border border-secondary-gray0 bg-white">
                <table className="w-full table-fixed border-collapse font-['Segoe_UI'] text-[11.5px] text-secondary-darkgray2">
                  <colgroup>
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[15%]" />
                    <col className="w-[8%]" />
                    <col className="w-[18%]" />
                    <col className="w-[20%]" />
                    <col />
                  </colgroup>

                  {/* 헤더 */}
                  <thead>
                    {/* 1️⃣ 타이틀 줄 */}
                    <tr className="border-b-[1.5px] border-black/70 bg-secondary-gray0">
                      {tableHeaders.map((header, i) => (
                        <th
                          key={i}
                          className={`whitespace-nowrap border-x border-black/40 px-3 py-2 text-center font-semibold text-secondary-darkgray3 ${i === 0 && "border-l-0"} ${i === tableHeaders.length - 1 && "border-r-0"}`}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <Text variant="mini" className="text-[12px] font-semibold">
                              {header.label}
                            </Text>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* 본문 */}
                  <tbody>
                    {tcListEx.map((row, rowIndex) => (
                      <tr
                        key={row.id}
                        className={`${
                          rowIndex < tcListEx.length - 1 ? "border-b border-black/40" : ""
                        } transition-colors`}
                      >
                        {tableColumns.map(({ key, align }, colIndex) => (
                          <td
                            key={key}
                            className={`border-x border-black/40 px-1 py-0.5 text-left ${colIndex === 0 && "border-l-0"} ${colIndex === tableColumns.length - 1 && "border-r-0"}`}
                          >
                            <div className="flex flex-col items-start justify-start gap-1">
                              <Text
                                variant="title-sm"
                                className={`whitespace-pre-line px-1 leading-tight text-${align}`}
                              >
                                {row[key]}
                              </Text>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
