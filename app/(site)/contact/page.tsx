import type { Metadata } from 'next';
import { getSettings } from '@/lib/queries';
import { whatsappUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.contactTitle,
    description: settings.contactIntro,
    alternates: { canonical: '/contact' },
    openGraph: {
      title: `${settings.contactTitle} · ${settings.fullName}`,
      description: settings.contactIntro,
    },
  };
}

export default async function ContactPage() {
  const settings = await getSettings();

  const rows = [
    { label: 'email', value: settings.email, href: `mailto:${settings.email}`, external: false },
    {
      label: 'whatsapp',
      value: settings.phoneLabel,
      href: whatsappUrl(settings.phone),
      external: true,
    },
    { label: 'linkedin', value: settings.linkedinLabel, href: settings.linkedinUrl, external: true },
    { label: 'github', value: settings.githubLabel, href: settings.githubUrl, external: true },
    { label: 'résumé', value: settings.resumeLabel, href: settings.resumeUrl, external: true },
  ];

  return (
    <section className="pt-[76px] pb-[84px]" style={{ transformStyle: 'preserve-3d' }}>
      <h1 data-anim="" className="m-0 mb-[22px] text-[27px] font-semibold tracking-[-0.025em]">
        {settings.contactTitle}
      </h1>
      <p data-anim="" className="m-0 mb-10 max-w-[62ch] text-[17.5px] leading-[1.72] text-text-3">
        {settings.contactIntro}
      </p>

      <div className="flex flex-col">
        {rows.map((row, index) => (
          <a
            key={row.label}
            href={row.href}
            data-anim=""
            {...(row.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className={`grid grid-cols-[116px_minmax(0,1fr)] items-baseline gap-6 border-t border-rule py-[17px] transition-[border-color,transform] duration-[400ms] ease-site hover:translate-x-[5px] hover:border-accent-50 ${
              index === rows.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className="font-mono text-[13px] text-muted">{row.label}</span>
            <span className="text-[17px]">{row.value}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
