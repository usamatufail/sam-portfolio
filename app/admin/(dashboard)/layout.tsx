import Link from 'next/link';
import { logoutAction } from '@/lib/actions/auth';
import { requireAdmin } from '@/lib/auth';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/settings', label: 'Site settings' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/experience', label: 'Experience' },
  { href: '/admin/principles', label: 'How I work' },
  { href: '/admin/education', label: 'Education' },
  { href: '/admin/commands', label: 'Command palette' },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-6 py-10 lg:flex-row lg:gap-12">
      <aside className="lg:sticky lg:top-10 lg:h-fit lg:w-[200px] lg:flex-none">
        <div className="mb-6 text-[15px] font-semibold tracking-[-0.01em]">Portfolio admin</div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[13px] lg:flex-col lg:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-text-5 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-[13px]">
          <Link href="/" target="_blank" className="text-muted transition-colors hover:text-accent">
            View site ↗
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="cursor-pointer border-none bg-transparent p-0 font-mono text-[13px] text-muted transition-colors hover:text-accent"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
