interface ChipProps {
  value: string;
  onClick?: () => void;
}

export const Chip = ({ value, onClick }: ChipProps) => {
  return (
    <button
      aria-label="Chip"
      className="px-4 h-[1.875rem] bg-violet-50 rounded-[0.625rem] text-center text-indigo-600 text-[0.8125rem] font-semibold  hover:bg-indigo-200 transition-all duration-100 ease-in-out border-none active:bg-indigo-600 active:text-white"
      onClick={onClick}
    >
      {value}
    </button>
  );
};
