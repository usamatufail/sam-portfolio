'use client';

import { inputBase } from './styles';

export function Field({
  label,
  name,
  defaultValue,
  hint,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  hint?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-muted mb-1.5 block font-mono text-[12px]">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ''}
        required={required}
        placeholder={placeholder}
        className={inputBase}
      />
      {hint && <span className="text-faint mt-1.5 block text-[13px]">{hint}</span>}
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  hint,
  rows = 5,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  hint?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-muted mb-1.5 block font-mono text-[12px]">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ''}
        className={`${inputBase} resize-y leading-[1.6]`}
      />
      {hint && <span className="text-faint mt-1.5 block text-[13px]">{hint}</span>}
    </label>
  );
}

export function Select({
  label,
  name,
  defaultValue,
  options,
  hint,
  onChange,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  hint?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-muted mb-1.5 block font-mono text-[12px]">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        className={inputBase}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-bg">
            {option.label}
          </option>
        ))}
      </select>
      {hint && <span className="text-faint mt-1.5 block text-[13px]">{hint}</span>}
    </label>
  );
}

export function Toggle({
  label,
  name,
  defaultChecked,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <label className="border-rule bg-bg flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 flex-none accent-[oklch(0.74_0.135_243)]"
      />
      <span>
        <span className="text-text block text-[15px]">{label}</span>
        {hint && <span className="text-faint mt-0.5 block text-[13px]">{hint}</span>}
      </span>
    </label>
  );
}
