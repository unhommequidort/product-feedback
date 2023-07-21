import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { ReactComponent as ArrowLeft } from '../../../../assets/back_arrow.svg';

const iconButton = cva(
  'w-[9.875rem] h-[3.3125rem] flex justify-center items-center gap-[0.9794rem]  text-sm font-bold hover:underline transition-all duration-200 ease-in-out border-none',
  {
    variants: {
      intent: {
        goBack1: 'text-slate-500',
        goBack2: 'bg-slate-700 rounded-[0.625rem] text-white',
      },
    },
    defaultVariants: {
      intent: 'goBack1',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButton> {}

export const IconButton = ({
  className,
  intent,
  children,
  ...props
}: IconButtonProps) => (
  <button className={iconButton({ className, intent })} {...props}>
    <ArrowLeft /> {children}
  </button>
);
