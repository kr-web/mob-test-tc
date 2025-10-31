import type { JSX } from "react";
import { textVariants, type StyleVariant } from "./TypographyVariants";

interface TypographyProps {
  as?: keyof JSX.IntrinsicElements;
  variant: StyleVariant;
  children: React.ReactNode;
  className?: string;
}

export function Text({
  as: Tag = "p",
  variant,
  children,
  className,
}: TypographyProps) {
  return (
    <Tag className={`${textVariants[variant]} ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
