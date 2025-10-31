import { useRef, useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { WorkspaceItem } from "./WorkspaceItem";
import { WorkspaceModal } from "@/components/layouts/workspace/modal/WorkspaceModal.tsx";

import { useClickOutside } from "@/utils/useClickOutside";
import { useModal } from "@/hooks/useModal";
import { Text } from "@/components/ui/Typography/Text";
import LogoutIcon from "@/assets/icons/actionBar/logout.svg?react-no-replace"
import {useToast} from "@/hooks/useToast.ts";
import {Toast} from "@/components/toast/Toast.tsx";
import {ConfirmModal} from "@/components/modal/ConfirmModal.tsx";
import type { WorkspaceOption } from "@/types/workspaceOption.ts";

interface WorkspaceProps {
  workspaceModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onConfirm: () => void;
    onToggle: () => void;
  }
  workspaceDropdown: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  };
  openLogoutModal: () => void;
}

export const Workspace = ({ workspaceModal, workspaceDropdown, openLogoutModal }: WorkspaceProps) => {
  // ============================================================================================
  // 상태 관리 ------------------------------------------------------------------------------------
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [workspaceOption, setWorkspaceOption] = useState<WorkspaceOption[]>([
    { id: 1, name: "홍길동의스페이스", img: null, isSelected: true },
    { id: 2, name: "고길동의스페이스", img: null, isSelected: false },
  ]);
  const [ selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceOption | null>(null);
  const [ query, setQuery] = useState<string>("");
  const [ img, setImg] = useState<File | null>(null);
  const { toastState, toastOpen, toastClose } = useToast();
  const workspaceRemove = useModal();

  // =============================================================================================
  // 워크스페이스 드롭다운 ---------------------------------------------------------------------------
  // 외부 클릭 시 드롭다운 Close ---------------------------------------------------------------------
  useClickOutside(workspaceRef, () => workspaceDropdown.onClose(), workspaceDropdown.isOpen);

  // =============================================================================================
  // 워크스페이스 모달 ------------------------------------------------------------------------------
  // name 입력 ------------------------------------------------------------------------------------
  const handleQuery = (value: string) => {
    setQuery(value);
  }

  const handleImg = (file: File) => {
    setImg(file);
  }

  const removeImg = () => {
    setImg(null);
  }

  // 워크스페이스 생성 & 수정 모달 오픈 ----------------------------------------------------------------
  const handleModalOpen = (option?: WorkspaceOption) => {
    if (option){
      // 워크스페이스 수정
      setSelectedWorkspace(option);
      setQuery(option.name);
      setImg(option.img);
    } else{
      // 워크스페이스 생성
      setSelectedWorkspace(null);
      setQuery("");
      setImg(null);
    }

    workspaceModal.onOpen();
    workspaceDropdown.onClose();
  }

  // 워크스페이스 생성 & 수정 ------------------------------------------------------------------------
  const saveWorkspace = () => {
    if(query === ""){
      toastOpen("경고", "워크스페이스 이름을 입력해주세요.", "N");
      return;
    }

    if(!/^.{2,8}$/.test(query)){
      toastOpen("경고", "2자 이상 8자 미만 입력해주세요.", "N");
      return;
    }

    if (selectedWorkspace) {
      setWorkspaceOption(prev =>
        prev.map(o =>
          o.id === selectedWorkspace.id ? { ...o, name: query, img } : o
        )
      );
    } else {
      if(workspaceOption.some(option => option.name === query)){
        toastOpen("중복된 이름", "이미 존재하는 워크스페이스 이름이에요.", "N");
        return;
      }

      const newId = Math.max(0, ...workspaceOption.map(o => o.id)) + 1;
      const newWorkspace: WorkspaceOption = {
        id: newId,
        name: query,
        img,
        isSelected: false
      };
      setWorkspaceOption(prev => [...prev, newWorkspace]);
    }

    workspaceModal.onClose();
  }

  // 워크스페이스 삭제 ------------------------------------------------------------------------------
  const handleRemove = () => {
    workspaceModal.onClose();
    workspaceRemove.onClose();
  }

  return (
    <div className="relative inline-block" ref={workspaceRef}>
      <div
        className="flex w-[210px] items-center rounded-[80px] bg-white py-1 pl-1 pr-5 hover:cursor-pointer dark:bg-primary-navy"
        onClick={workspaceDropdown.onToggle}
      >
        <WorkspaceItem
          type="title"
          name={workspaceOption.find((option) => option.isSelected)?.name ?? ""}
          img={workspaceOption.find((option) => option.isSelected)?.img ?? null}
          isOpen={workspaceDropdown.isOpen}
        />
      </div>

      {workspaceDropdown.isOpen && (
        <div
          className="absolute mt-2 flex min-h-20 w-[210px] flex-col items-center gap-2 rounded-xl bg-white p-1 shadow-2xl dark:bg-primary-navy">
          <div className={`flex flex-col items-center gap-[10px] ${workspaceOption.length > 10 ? 'scroll h-[410px] overflow-y-auto' : ''}`}>
            {workspaceOption.map((option) => (
              <WorkspaceItem
                type="content"
                key={option.name}
                name={option.name}
                img={option.img}
                setWorkspaceOption={setWorkspaceOption}
                isClose={workspaceDropdown.onClose}
                openModal={() => handleModalOpen(option)}
              />
            ))}
          </div>

          {/* new workspace */}
          <button
            className="flex w-[200px] items-center gap-2 text-secondary-gray1"
            onClick={() => handleModalOpen()}
          >
            <div className="relative flex h-8 w-8 items-center justify-center">
              <FaSquarePlus className="h-4 w-4"/>
            </div>

            <Text variant="menu-sm" className="ml-2">
              New Workspace
            </Text>
          </button>

          {/* logout */}
          <button
            className="flex w-[200px] h-8 items-center gap-2 bg-primary-gray rounded-lg text-secondary-gray1 dark:bg-secondary-darkgray2"
            onClick={openLogoutModal}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <LogoutIcon className="h-4 w-4"/>
            </div>

            <Text variant="menu-sm" className="ml-2">
              Logout
            </Text>
          </button>
        </div>
      )}

      { workspaceModal.isOpen &&
				<WorkspaceModal
					isOpen={workspaceModal.isOpen}
					onClose={workspaceModal.onClose}
					onConfirm={saveWorkspace}
					img={img}
					handleImg={handleImg}
					removeImg={removeImg}
					query={query}
					handleQuery={handleQuery}
					onRemove={workspaceRemove.onOpen}
				/>
      }

      {/* 토스트 */}
      <Toast
        toast={toastState.open}
        title={toastState.title}
        content={toastState.content}
        type={toastState.type}
        onClose={toastClose}
      />

      {/* 워크스페이스 삭제 */}
      { workspaceRemove.isOpen && (
        <ConfirmModal
          isOpen={workspaceRemove.isOpen}
          onClose={workspaceRemove.onClose}
          onConfirm={handleRemove}
          title="워크스페이스 삭제"
          btnNm="영구삭제"
          isDelete={true}
        >
          삭제하시겠어요?<br/>
          삭제시, 해당 워크 스페이스 내부에 저장된<br/>
          TC는 복원할 수 없어요<br/>
          <p className="text-status-false">이 작업은 취소할 수 없어요!</p>
        </ConfirmModal>
      )
      }
    </div>
  );
};
