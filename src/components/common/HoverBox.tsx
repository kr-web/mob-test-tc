export const HoverBox = ({ label }: { label: string }) => {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2
                    rounded-lg px-3.5 py-2 bg-primary-navy shadow-soft-md
                    whitespace-nowrap z-10"
    >
      <span className="font-semibold text-xs text-white">{label}</span>
    </div>
  );
};
