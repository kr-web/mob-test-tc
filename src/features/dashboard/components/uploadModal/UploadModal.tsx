import { BaseModal } from "@/components/modal/BaseModal";
import { MenuTab } from "./menuTab/MenuTab";
import { UrlContent } from "./item/url/UrlContent.tsx";
import { FileContent } from "./item/file/FileContent.tsx";

import type { HandleFiles, UploadFiles } from "@/types/UploadFiles";

type UploadFilesProps = {
  isOpen: boolean;
  currentTab: number;
  handleMenuTab: (id: number) => void;
  tempFiles: UploadFiles;
  itemAdd: HandleFiles['itemAdd'];
  itemRemove: HandleFiles['itemRemove'];
  hasNewData: HandleFiles['hasNewData'];
  uploadCancelAction: () => void;
  uploadConfirmAction: () => void;
};

export function UploadModal({
                              isOpen,
                              currentTab,
                              handleMenuTab,
                              tempFiles,
                              itemAdd,
                              hasNewData,
                              itemRemove,
                              uploadCancelAction,
                              uploadConfirmAction
}: UploadFilesProps) {

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={uploadCancelAction}
      onConfirm={uploadConfirmAction}
      onCancel={uploadCancelAction}
      width="w-[620px]"
      title="파일 업로드"
      btnNm="적용하기"
      closeSize="size-8"
      canCloseOnClick={() => !hasNewData()}
    >
      <div className="flex flex-col gap-2">
        <MenuTab currentTab={currentTab} handleMenuTab={handleMenuTab} />

        {currentTab === 4 ?
          <UrlContent
            files={tempFiles}
            itemAdd={itemAdd}
            itemRemove={itemRemove}
          />
          :
          <FileContent
            files={tempFiles}
            itemAdd={itemAdd}
            itemRemove={itemRemove}
            currentTab={currentTab}
          />
        }
      </div>
    </BaseModal>
  );
}
