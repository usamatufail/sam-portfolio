'use client';

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
    <section className="border-rule bg-panel rounded-2xl border p-6">
      <h2 className="m-0 text-[17px] font-semibold tracking-[-0.015em]">{title}</h2>
      {description && <p className="text-text-5 mt-1.5 mb-0 text-[14px]">{description}</p>}
      <div className={`mt-5 grid gap-5 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>{children}</div>
    </section>
  );
}
