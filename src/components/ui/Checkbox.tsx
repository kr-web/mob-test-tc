import clsx from "clsx";
import { FaCheck } from "react-icons/fa";

interface CheckboxProps {
  checked: boolean;
  setChecked: () => void;
  disabled?: boolean;
}

export const Checkbox = ({ checked, setChecked, disabled = false }: CheckboxProps) => {
  return (
    <label
      className={clsx(
        "flex select-none items-center justify-center",
        !disabled && "cursor-pointer",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={setChecked}
        className="peer sr-only appearance-none focus:outline-none focus:ring-0 focus:ring-offset-0"
        disabled={disabled}
        onFocus={(e) => e.target.blur()}
      />

      <div
        className={clsx(
          "flex h-4 w-4 items-center justify-center rounded border transition-all duration-150",
          disabled
            ? "border-secondary-gray0 border-transparent bg-secondary-gray0"
            : checked
              ? "border-primary-navy bg-primary-navy"
              : "border-secondary-gray2 bg-white",
        )}
      >
        {checked && <FaCheck className="h-2 w-2 text-white" />}
      </div>
    </label>
  );
};
