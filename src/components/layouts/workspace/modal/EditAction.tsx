import {HoverBox} from "@/components/common/HoverBox.tsx";
import Edit from "@/assets/icons/common/edit.svg?react";
import {useState} from "react";

interface EditButtonProps {
  img: File | null;
  removeImg: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditAction = ({
                             img,
                             removeImg,
                             fileInputRef,
                             handleFileChange,
                           } : EditButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  const [imgAction, setImgAction] = useState(false);

  return (
    <div className="absolute bottom-0 right-0 flex items-center justify-center translate-x-1 translate-y-1">
      <button
        className="flex items-center justify-center"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          if (img) {
            setImgAction(true);
            setIsHover(false);
          } else {
            fileInputRef.current?.click()
          }
        }}
      >
        <Edit
          className={`w-6 h-6 hover:text-secondary-darkgray2 ${imgAction ? "text-secondary-darkgray2" : "text-secondary-gray1"} transition-colors`}/>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </button>

      {imgAction && (
        <div
          className="absolute left-7 top-[-6px]
                    rounded-lg p-1 bg-white shadow-soft-md
                    whitespace-nowrap z-10 font-semibold
                    flex flex-col items-start gap-1
                    "
        >
          <button
            className="h-[30px] px-3 flex items-center text-secondary-darkgray3"
            onClick={() => {
              fileInputRef.current?.click();
              setImgAction(false);
            }}
          >
            새로운 프로필 업로드
          </button>
          <button
            className="h-[30px] px-3 flex items-center text-status-false"
            onClick={() => {
              removeImg();
              setImgAction(false);
            }}
          >
            프로필 삭제
          </button>
        </div>
      )}

      {/* Tooltip */}
      {isHover && (
        <HoverBox label="워크스페이스 프로필을 변경하려면 아이콘 클릭"/>
      )}
    </div>
  )
}