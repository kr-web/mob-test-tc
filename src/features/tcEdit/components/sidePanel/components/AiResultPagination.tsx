import { Text } from "@/components/ui/Typography/Text";
import type { Pagination } from "@/types/Pagination";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export const AiResultPagination = ({ pagination }: { pagination: Pagination }) => {
  const { currentPage, totalPages, handlePageChange } = pagination;

  const handlePagination = (e: React.MouseEvent, next: number) => {
    e.stopPropagation();
    handlePageChange(next);
  };

  return (
    <div className="flex h-8 items-center align-middle text-secondary-gray1">
      <div className="flex h-8 w-8 items-center justify-center">
        <button
          onClick={(e) => handlePagination(e, currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:text-secondary-gray0"
        >
          <MdArrowBackIos className="h-4 w-4" />
        </button>
      </div>
      <Text variant="body" className="flex h-8 items-center justify-center px-1">
        {currentPage}/{totalPages}
      </Text>
      <div className="flex h-8 w-8 items-center justify-center">
        <button
          onClick={(e) => handlePagination(e, currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:text-secondary-gray0"
        >
          <MdArrowForwardIos className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
