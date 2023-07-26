interface ITextInputProps {
  name: string;
  label: string;
  description?: string;
  width?: string;
  error?: string;
  type?: string;
}

export const TextInput = ({
  name,
  label,
  description,
  width,
  error,
  type = 'text',
}: ITextInputProps) => {
  return (
    <div>
      <label className="text-slate-600 text-sm font-bold" htmlFor={name}>
        {label}
      </label>

      <p id={`${name}Desc`} className="text-slate-500 text-sm font-normal mb-4">
        {description}
      </p>
      <input
        type={type}
        aria-labelledby={`${name} ${name}Desc`}
        aria-describedby={`${name}Err`}
        className={`bg-slate-50 rounded-[0.3125rem] focus:outline focus:outline-1 focus:border-indigo-600 py-[0.8125rem] px-6 ${
          width || ''
        } ${error ? 'border border-red-600' : 'border-none'} 
            `}
        id={name}
      />
      <p id={`${name}Err`} className="text-red-600 text-sm font-normal mt-1">
        {error}
      </p>
    </div>
  );
};
