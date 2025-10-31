import { BaseModal } from "@/components/modal/BaseModal";

export const NoRecModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width="w-auto"
      title="비추천하는 이유"
      btnNm="접수하기"
    >
      <div className="flex flex-col justify-between gap-2.5 w-[359px] overflow-hidden">
        <div className="flex flex-col gap-3 items-start">
          {[
            { value: "1", label: "정확도가 떨어짐" },
            { value: "2", label: "재생성을 해도 비슷한 결과가 나옴" },
            { value: "3", label: "퀄리티가 좋지 않음" },
          ].map((opt) => (
            <label key={opt.value} className="flex gap-2.5 items-center">
              <input type="radio" name="noRecReason" value={opt.value} />
              {opt.label}
            </label>
          ))}
        </div>
        <textarea
          className={`h-[120px] bg-primary-gray border border-primary-navy rounded-lg px-3 py-2.5 
                        focus:outline-none transition-none resize-none
                        font-medium  text-xs text-secondary-darkgray3`}
          placeholder="직접 입력"
        />
      </div>
    </BaseModal>
  );
};
