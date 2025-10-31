import { Text } from "@/components/ui/Typography/Text";
import { Pagination } from "@/components/ui/pagintaion/Pagination";
import { ActionBarButton } from "../ui/button/ActionBarButton";
import type { ActionBarMenu } from "@/types/ActionbarMenu";

export const ActionBar = ({
  checkedLen = 0,
  menus,
  currentPage,
  totalPages,
  handlePageChange,
  clearSelection,
}: {
  checkedLen?: number;
  menus: ActionBarMenu[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  clearSelection?: () => void;
}) => {
  const disabled = checkedLen === 0;

  return (
    <div className="fixed bottom-12 left-1/2 z-50 -translate-x-1/2">
      <div className="relative h-14 rounded-2xl shadow-lg before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-r before:from-[#016DFF] before:to-[#99FF4B] before:p-[2px] before:content-[''] after:absolute after:inset-[2px] after:-z-0 after:rounded-[14px] after:bg-white after:content-['']">
        <div
          className="relative z-10 grid h-full items-center px-2"
          style={{
            gridTemplateColumns: `repeat(${menus.length + 1}, auto) 1fr`,
          }}
        >
          {/* 선택취소 */}
          <button
            className="flex items-center gap-1 px-5 hover:cursor-pointer"
            onClick={clearSelection}
          >
            <div className="flex h-[18px] min-w-[18px] items-center justify-center rounded bg-secondary-gray0 px-[5px]">
              <Text
                variant="title-sm"
                className={`${disabled ? "text-secondary-gray2" : "text-secondary-darkgray1"}`}
              >
                {checkedLen}
              </Text>
            </div>
            <Text
              variant="body"
              className={`${disabled ? "text-secondary-gray0" : "text-secondary-darkgray3"}`}
            >
              선택취소
            </Text>
          </button>

          {menus.map((menu) => (
            <ActionBarButton key={menu.label} menu={menu} disabled={disabled} />
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
