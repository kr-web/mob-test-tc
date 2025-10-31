import { Text } from '@/components/ui/Typography/Text';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export const TcNoData = ({
  label,
  backToDataSet,
}: {
  label: string;
  backToDataSet: () => void;
}) => (
  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="flex flex-col items-center gap-3 px-6 py-3 text-secondary-gray1">
      <IoIosCloseCircleOutline className="h-10 w-10" />
      <Text variant="body-md">{label}</Text>
    </div>
    <button className="bg-primary-green p-3" onClick={backToDataSet}>
      임시버튼 (데이터 있는 상태로 돌아가기)
    </button>
  </div>
);
