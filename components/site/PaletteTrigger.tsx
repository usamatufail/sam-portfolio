'use client';

/** The small ⌘K affordance under the footer. */
export function PaletteTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="mx-auto mt-[-22px] w-full max-w-[720px] px-[28px] pb-[34px]">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open command palette"
        className="text-faint hover:text-accent -m-3 inline-flex min-h-11 min-w-11 cursor-pointer appearance-none items-center border-none bg-transparent p-3 font-mono text-[11.5px] transition-colors duration-300"
      >
        ⌘K
      </button>
    </div>
  );
}
