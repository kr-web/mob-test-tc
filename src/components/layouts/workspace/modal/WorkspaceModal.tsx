import { useRef } from "react";

import { BaseModal } from "@/components/modal/BaseModal";
import { Text } from "@/components/ui/Typography/Text";
import { InputText } from "@/components/ui/Typography/Input";

import { EditAction } from "./EditAction";
import { RemoveAction } from "./RemoveAction";
import { DefaultProfile } from "../DefaultProfile";

import InvaidIcon from "@/assets/icons/common/invalid.svg?react";

interface WorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  img: File | null;
  handleImg: (file: File) => void;
  removeImg: () => void;
  query: string;
  handleQuery: (value: string) => void;
  onRemove: () => void;
}

export const WorkspaceModal = ({ isOpen, onClose, onConfirm, img, handleImg, removeImg, query, handleQuery, onRemove }: WorkspaceModalProps) => {
  // File Event --------
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    handleImg(e.target.files[0]);
    e.target.value = "";
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      width="w-[500px]"
      title="Workspace"
      btnNm="적용하기"
      closeSize="size-8"
    >
      <div className="flex w-full justify-between gap-3">
        {/* left_profile */}
        <div className="relative flex items-center justify-center w-[100px] h-[100px] overflow-visible">
          <div className="relative size-20">
            <DefaultProfile name={query.substring(1,0)} size="lg" src={img}/>

            <EditAction
              img={img}
              removeImg={removeImg}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>

        {/* right_input */}
        <div className="flex flex-col flex-1 gap-2 items-start justify-center">
          <div className="flex w-full justify-between items-center">
            <Text variant="menu" className="text-primary-darkgray3">
              워크스페이스 이름
            </Text>
            <RemoveAction onRemove={onRemove} />
          </div>
          <InputText
            value={query}
            variant="body"
            className="h-9 px-5 py-2.5 rounded-lg bg-primary-gray text-secondary-darkgray1 w-full placeholder:text-secondary-darkgray1"
            onChange={(e) => handleQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onConfirm()}
            placeholder="'s Workspace"
          />
          <p className="flex items-center gap-1 text-secondary-gray1 font-medium text-[14px]">
            <InvaidIcon />2자 이상 8자 미만으로 입력해주세요.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};
