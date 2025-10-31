import SetIcon from "@/assets/icons/actionBar/setting.svg?react-no-replace";

interface WorkspaceDefaultProps {
  selectedItem: {
    id: number;
    name: string;
    img: File | null;
    isSelected: boolean;
  } | null;
  onToggle: () => void;
}

export const WorkspaceDefault = ({ selectedItem, onToggle } : WorkspaceDefaultProps) => {
  if (!selectedItem) return null;

  return(
    <div className="flex flex-col w-full items-center">
      <div className="relative w-[100px] h-[100px]">
        {
          selectedItem.img ?
            <div
              className="w-[80px] h-[80px] rounded-full bg-white">
              <img src={URL.createObjectURL(selectedItem.img)} />
            </div>
            :
            <div
              className="w-[80px] h-[80px] rounded-full bg-[#C0FDDD] flex items-center justify-center font-bold text-primary-navy text-[28px]">
              {selectedItem.name.charAt(0)}
            </div>
        }
      </div>
      <p className="flex items-center gap-[5px] font-medium text-white">
        {selectedItem.name}
        <button className="w-4 h-4" onClick={onToggle}>
          <SetIcon className="text-secondary-gray1"/>
        </button>
      </p>
    </div>
  )
}