import { ReactComponent as ArrowUp } from '../../../../assets/up_arrow.svg';

interface UpvoteProps {
  value: number;
  onClick?: () => void;
}

export const Upvote = ({ value = 0, onClick }: UpvoteProps) => {
  return (
    <button
      className="flex flex-col justify-center items-center w-10 h-[3.3125rem] bg-violet-50 rounded-[0.625rem] text-center text-slate-600 text-[0.8125rem] font-bold gap-[0.2rem] hover:bg-indigo-200 transition-all duration-100 ease-in-out border-none active:bg-indigo-600 active:text-white"
      onClick={onClick}
    >
      <ArrowUp />
      {value}
    </button>
  );
};
