import { IoIosCloseCircleOutline } from 'react-icons/io';

export const NotData = ({ label }: { label: string }) => (
  <div className="fixed w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="flex flex-col items-center gap-3 px-6 py-3 font-semibold text-secondary-gray1">
      <IoIosCloseCircleOutline className="h-10 w-10" />
      <p>{label}한 테스트케이스가 없습니다.</p>
    </div>
  </div>
);
