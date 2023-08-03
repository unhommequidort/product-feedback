import clsx from 'clsx';

interface RoundedBoxProps {
  children: React.ReactNode;
  width?: string;
  className?: string;
}

export const RoundedBox = ({
  children,
  width = 'w-full',
  className = '',
}: RoundedBoxProps) => {
  return (
    <div className={clsx([width, className, 'bg-white', 'rounded-[0.625rem]'])}>
      {children}
    </div>
  );
};

export default RoundedBox;
