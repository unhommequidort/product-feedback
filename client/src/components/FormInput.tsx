import { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const FormInput = ({ name, label, ...rest }: IFormInputProps) => {
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
          <label htmlFor={name}>{label}</label>
          <input {...field} {...rest} />
          <div>{errors[name]?.message?.toString() ?? ''}</div>
        </div>
      )}
    />
  );
};

export default FormInput;
