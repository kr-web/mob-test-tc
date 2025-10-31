import { textVariants } from "@/components/ui/Typography/TypographyVariants";
import { autoResize } from "@/utils/autoResize";
import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface EditableCellProps {
  editedValue: string;
  handleEditedValue: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const EditableCell = ({
  editedValue,
  handleEditedValue,
  onSave,
  onCancel,
}: EditableCellProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      autoResize(textareaRef.current);
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-start">
      <textarea
        ref={textareaRef}
        value={editedValue}
        onChange={(e) => {
          handleEditedValue(e.target.value);
          if (textareaRef.current) autoResize(textareaRef.current);
        }}
        rows={1}
        className={`w-full resize-none appearance-none overflow-hidden rounded-t-lg rounded-bl-lg border border-primary-blue bg-primary-gray px-3 py-2.5 text-sm transition-none focus:outline-none ${textVariants["title-sm"]}`}
      />
      <div className="flex w-full justify-end">
        <div className="flex gap-1 rounded-b-lg bg-primary-blue px-2 py-1 text-white">
          <button onClick={() => onSave()}>
            <Check className="h-4 w-4" />
          </button>
          <button onClick={onCancel}>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
