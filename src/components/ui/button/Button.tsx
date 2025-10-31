import { clsx } from "clsx";

const buttonVariants = {
  variant: {
    mini: "flex items-center justify-center rounded-lg px-4 py-0.5 h-9",
    field: "h-9 rounded-lg px-5 py-2.5 gap-2.5",
    "round-box": "w-40 h-12 rounded-[100px] p-2.5",
  },
};

export interface ButtonProps {
  variant?: keyof typeof buttonVariants.variant;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ variant = "mini", className = "", children, onClick }: ButtonProps) => {
  const variantClass = buttonVariants.variant[variant];

  return (
    <button className={clsx(variantClass, className)} onClick={onClick}>
      {children}
    </button>
  );
};

Button.displayName = "Button";

export { Button, buttonVariants };
