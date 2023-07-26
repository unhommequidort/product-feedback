import { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  description?: string;
  width?: string;
}

export const FormInput = ({
  name,
  label,
  description,
  width = 'w-full',
  ...rest
}: IFormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={''}
      name={name}
      render={({ field }) => (
        <div>
          <label className="text-slate-600 text-sm font-bold" htmlFor={name}>
            {label}
          </label>
          <div className="text-slate-500 text-sm font-normal mb-4">
            {description}
          </div>
          <input
            {...field}
            {...rest}
            className={`bg-slate-50 rounded-[0.3125rem] focus:outline focus:outline-1 focus:border-indigo-600 py-[0.8125rem] px-6 ${
              width || ''
            } ${errors[name] ? 'border border-red-600' : 'border-none'} 
            `}
          />
          <div className="text-red-600 text-sm font-normal">
            {errors[name]?.message?.toString() ?? ''}
          </div>
        </div>
      )}
    />
  );
};

export default FormInput;
