import type { TcDetail } from "@/types/testcase";

const thClass = "align-top text-secondary-gray1 font-medium w-[30%]";
const tdClass = "align-top text-secondary-darkgray3 whitespace-pre-wrap";

export const TestCase = ({ item }: { item: TcDetail }) => {
  return (
    <div className="w-full rounded-xl bg-white px-5 py-2">
      <table className="w-full border-separate border-spacing-y-[12px] text-left align-text-top text-sm">
        <tbody>
          <tr>
            <th className={thClass}>TCID</th>
            <td className={tdClass}>{item.tcSeq}</td>
          </tr>
          <tr>
            <th className={thClass}>SERVICE NAME</th>
            <td className="align-center whitespace-pre-wrap text-secondary-darkgray3">
              {item.serviceName}
            </td>
          </tr>
          <tr>
            <th className={thClass}>TC_NAME</th>
            <td className={tdClass}>{item.serviceName}</td>
          </tr>
          <tr>
            <th className={thClass}>PRIORITY</th>
            <td className={tdClass}>{item.priority}</td>
          </tr>
          <tr>
            <th className={thClass}>TEST_STEP</th>
            <td className={tdClass}>{item.testStep}</td>
          </tr>
          <tr>
            <th className={thClass}>PRE_ CONDITION</th>
            <td className={tdClass}>{item.precondition}</td>
          </tr>
          <tr>
            <th className={thClass}>Expected Result</th>
            <td className={tdClass}>{item.expectedResult}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
