import { Field, FieldProps } from 'formik';

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  rows?: number;
  cols?: number;
}

export const Input = ({
  name,
  label,
  placeholder,
  type,
  rows,
  cols,
}: InputProps) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        const isError = meta.touched && meta.error;
        const className = isError
          ? 'transition-all bg-[#011221] border border-red-500 text-red-900 placeholder-red-700 text-[16px] rounded-[8px] focus:shadow-[0px_0px_2px_2px_rgb(180_15_15_/_90%)] block w-full p-2.5 outline-none'
          : 'transition-all bg-[#011221] border border-[#1E2D3D] text-[#465E77] text-[16px] rounded-[8px] focus:shadow-[0px_0px_4px_2px_rgba(96,_123,_150,_0.3)] block w-full p-2.5 placeholder:text-[#465E77] outline-none';
        return (
          <div>
            <label
              htmlFor={label}
              className="block mb-2 text-[16px] font-medium text-[#607B96]"
            >
              {label}
            </label>
            {type === 'textarea' ? (
              <textarea
                {...field}
                className={`${className}`}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                value={field.value}
              />
            ) : (
              <input
                {...field}
                type={type}
                className={className}
                placeholder={placeholder}
                value={field.value}
              />
            )}
            {meta.touched && meta.error && (
              <p className="mt-2 text-sm text-red-500">{meta.error}</p>
            )}
          </div>
        );
      }}
    </Field>
  );
};
