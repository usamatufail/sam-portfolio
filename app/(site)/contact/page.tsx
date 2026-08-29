import type { Metadata } from 'next';
import { Editable } from '@/components/edit/Editable';
import { editPath } from '@/lib/inline/fields';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { getSettings } from '@/lib/queries';
import { whatsappUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildPageMetadata({
    title: settings.contactTitle,
    description: settings.contactIntro,
    path: '/contact',
    siteName: settings.fullName,
  });
}

export default async function ContactPage() {
  const settings = await getSettings();

  const rows = [
    {
      label: 'email',
      value: settings.email,
      href: `mailto:${settings.email}`,
      external: false,
      path: editPath('settings', 1, 'email'),
    },
    {
      label: 'whatsapp',
      value: settings.phoneLabel,
      href: whatsappUrl(settings.phone),
      external: true,
      path: editPath('settings', 1, 'phoneLabel'),
    },
    {
      label: 'linkedin',
      value: settings.linkedinLabel,
      href: settings.linkedinUrl,
      external: true,
      path: editPath('settings', 1, 'linkedinLabel'),
    },
    {
      label: 'github',
      value: settings.githubLabel,
      href: settings.githubUrl,
      external: true,
      path: editPath('settings', 1, 'githubLabel'),
    },
    {
      label: 'résumé',
      value: settings.resumeLabel,
      href: settings.resumeUrl,
      external: true,
      path: editPath('settings', 1, 'resumeLabel'),
    },
  ];

  return (
    <section className="pt-[76px] pb-[84px]" style={{ transformStyle: 'preserve-3d' }}>
      <Editable
        as="h1"
        reveal
        path={editPath('settings', 1, 'contactTitle')}
        value={settings.contactTitle}
        className="m-0 mb-[22px] block text-[27px] font-semibold tracking-[-0.025em]"
      />
      <Editable
        as="p"
        reveal
        multiline
        path={editPath('settings', 1, 'contactIntro')}
        value={settings.contactIntro}
        className="text-text-3 m-0 mb-10 max-w-[62ch] text-[17.5px] leading-[1.72]"
      />

      <div className="flex flex-col">
        {rows.map((row, index) => (
          <a
            key={row.label}
            href={row.href}
            data-anim=""
            {...(row.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className={`border-rule ease-site hover:border-accent-50 grid grid-cols-1 gap-x-6 gap-y-1 border-t py-[17px] transition-[border-color,transform] duration-[400ms] hover:translate-x-[5px] sm:grid-cols-[116px_minmax(0,1fr)] sm:items-baseline ${
              index === rows.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className="text-muted font-mono text-[13px]">{row.label}</span>
            <Editable path={row.path} value={row.value} className="text-[17px] break-words" />
          </a>
        ))}
      </div>
    </section>
  );
}
