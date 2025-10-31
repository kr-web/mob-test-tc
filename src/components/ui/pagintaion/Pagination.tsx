import { IoIosArrowBack } from "react-icons/io";
import { useIsMobile } from "@/hooks/useIsMobile";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const isMobile = useIsMobile();

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div
      className={`bottom-5 left-0 right-0 z-50 m-auto flex h-10 w-[164px] items-center justify-center rounded-lg ${isMobile ? "fixed bg-primary-navy" : "bg-primary-gray text-secondary-gray2"}`}
    >
      <button
        className={`${currentPage === 1 ? "opacity-50" : ""} flex h-8 w-8 items-center justify-center`}
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack
          className={`${isMobile ? "text-secondary-gray0" : "text-secondary-gray2"}`}
        />
      </button>
      <div className="mr-3 flex gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-[8px] font-semibold tracking-[-0.02em] ${isMobile ? "bg-secondary-gray0 text-primary-navy" : "bg-primary-navy text-primary-gray"}`}
        >
          {currentPage}
        </div>
        <p
          className={`flex items-center justify-center font-semibold tracking-[-0.02em] ${isMobile ? "text-secondary-gray0" : "text-secondary-gray1"}`}
        >
          of {totalPages}
        </p>
      </div>
      <button
        className={`${currentPage === totalPages ? "opacity-50" : ""} flex h-8 w-8 rotate-180 items-center justify-center`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowBack
          className={`${isMobile ? "text-secondary-gray0" : "text-secondary-gray2"}`}
        />
      </button>
    </div>
  );
};
