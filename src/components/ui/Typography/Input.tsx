import { textVariants, type StyleVariant } from "./TypographyVariants";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: StyleVariant;
  className?: string;
}

export function InputText({ variant, className, ...props }: InputTextProps) {
  return (
    <input
      {...props}
      className={`focus:outline-none ${textVariants[variant]} ${
        className ?? ""
      }`}
    />
  );
}
