import { Text } from "@/components/ui/Typography/Text";
import { tableHeaders } from "../../constants/tableHeader";
import { tcListEx } from "../../constants/tcListEx";
import { tableColumns } from "../../constants/tableColumns";

export const PreviewTable = () => {
  return (
    <div className="w-full overflow-auto rounded-md border border-secondary-gray0 bg-white shadow-sm">
      <table className="w-full table-fixed border-collapse text-[12px] text-gray-800">
        <colgroup>
          <col className="w-[10%]" />
          <col className="w-[10%]" />
          <col className="w-[15%]" />
          <col className="w-[7%]" />
          <col className="w-[18%]" />
          <col className="w-[20%]" />
          <col />
        </colgroup>

        {/* 헤더 */}
        <thead>
          {/* 1️⃣ 타이틀 줄 */}
          <tr className="border-b border-black/30 bg-[#E8EBEE]">
            {tableHeaders.map((header, i) => (
              <th
                key={i}
                className={`whitespace-nowrap border-x border-black/30 px-3 py-2 text-center font-semibold text-secondary-darkgray3 ${i === 0 && "border-l-0"} ${i === tableHeaders.length - 1 && "border-r-0"}`}
              >
                <div className="flex items-center justify-center gap-1">
                  <Text variant="mini" className="text-[13px]">
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
              className={`${rowIndex < tcListEx.length - 1 ? "border-b border-black/30" : ""}`}
            >
              {tableColumns.map(({ key }, colIndex) => (
                <td
                  key={key}
                  className={`border-x border-black/30 px-1 py-0.5 text-left text-secondary-darkgray2 ${colIndex === 0 && "border-l-0"} ${colIndex === tableColumns.length - 1 && "border-r-0"}`}
                >
                  <div className="flex flex-col items-start justify-start gap-1">
                    <Text variant="title-sm" className={`leading-tight`}>
                      {Array.isArray(row[key]) ? row[key] : row[key]}
                    </Text>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
