'use client';

import { useFormStatus } from 'react-dom';
import type { ActionState } from '@/lib/actions/types';

const inputBase =
  'w-full rounded-lg border border-rule bg-bg px-3 py-2.5 text-[15px] text-text outline-none transition-colors placeholder:text-faint focus:border-accent';

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
      <span className="mb-1.5 block font-mono text-[12px] text-muted">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ''}
        required={required}
        placeholder={placeholder}
        className={inputBase}
      />
      {hint && <span className="mt-1.5 block text-[13px] text-faint">{hint}</span>}
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
      <span className="mb-1.5 block font-mono text-[12px] text-muted">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ''}
        className={`${inputBase} resize-y leading-[1.6]`}
      />
      {hint && <span className="mt-1.5 block text-[13px] text-faint">{hint}</span>}
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
      <span className="mb-1.5 block font-mono text-[12px] text-muted">{label}</span>
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
      {hint && <span className="mt-1.5 block text-[13px] text-faint">{hint}</span>}
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
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-rule bg-bg px-3 py-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 flex-none accent-[oklch(0.74_0.135_243)]"
      />
      <span>
        <span className="block text-[15px] text-text">{label}</span>
        {hint && <span className="mt-0.5 block text-[13px] text-faint">{hint}</span>}
      </span>
    </label>
  );
}

export function Section({
  title,
  description,
  children,
  columns = 2,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  columns?: 1 | 2;
}) {
  return (
    <section className="rounded-2xl border border-rule bg-panel p-6">
      <h2 className="m-0 text-[17px] font-semibold tracking-[-0.015em]">{title}</h2>
      {description && <p className="mt-1.5 mb-0 text-[14px] text-text-5">{description}</p>}
      <div className={`mt-5 grid gap-5 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>{children}</div>
    </section>
  );
}

export function SubmitButton({ children = 'Save changes' }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-lg bg-accent px-5 py-2.5 text-[15px] font-semibold text-bg transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? 'Saving…' : children}
    </button>
  );
}

export function DangerButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-lg border border-rule px-3 py-1.5 font-mono text-[12px] text-text-5 transition-colors hover:border-[oklch(0.6_0.19_25)] hover:text-[oklch(0.7_0.19_25)] disabled:opacity-50"
    >
      {pending ? '…' : children}
    </button>
  );
}

export function GhostButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-lg border border-rule px-3 py-1.5 font-mono text-[12px] text-text-5 transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
    >
      {pending ? '…' : children}
    </button>
  );
}

export function Status({ state }: { state: ActionState }) {
  if (!state) return null;
  return (
    <p
      role="status"
      className={`m-0 font-mono text-[13px] ${state.ok ? 'text-accent' : 'text-[oklch(0.72_0.19_25)]'}`}
    >
      {state.message}
    </p>
  );
}

/** Sticky footer bar carrying the submit button and the last save message. */
export function SaveBar({ state }: { state: ActionState }) {
  return (
    <div className="sticky bottom-0 -mx-1 flex items-center gap-4 border-t border-rule bg-bg/90 px-1 py-4 backdrop-blur">
      <SubmitButton />
      <Status state={state} />
    </div>
  );
}
