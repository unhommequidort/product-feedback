import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const button = cva(
  'w-[9.875rem] h-11 rounded-[0.625rem] font-jost text-violet-50 text-sm font-bold text-center transition-colors duration-200 ease-in-out',
  {
    variants: {
      intent: {
        button1: 'bg-fuchsia-600 hover:bg-fuchsia-500',
        button2: 'bg-indigo-600 hover:bg-indigo-400',
        button3: 'bg-slate-600 hover:bg-slate-500',
        button4: 'bg-red-600 hover:bg-rose-400',
      },
    },
    defaultVariants: {
      intent: 'button1',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const PrimaryButton = ({
  className,
  intent,
  children,
  ...props
}: ButtonProps) => (
  <button className={button({ className, intent })} {...props}>
    {children}
  </button>
);
