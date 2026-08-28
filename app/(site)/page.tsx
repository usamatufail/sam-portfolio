import Link from 'next/link';
import { Avatar } from '@/components/site/Avatar';
import { ToptalBadge } from '@/components/site/ToptalBadge';
import { getProjects, getSettings } from '@/lib/queries';
import { siteUrl } from '@/lib/site';

export default async function HomePage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  const featured = projects.filter((p) => p.featured);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.fullName,
    alternateName: 'Sam Tufail',
    jobTitle: settings.jobTitle,
    description: settings.seoDescription,
    url: siteUrl(),
    image: `${siteUrl()}${settings.avatarUrl}`,
    email: `mailto:${settings.email}`,
    sameAs: [settings.linkedinUrl, settings.githubUrl, settings.resumeUrl],
    knowsAbout: settings.seoKeywords.split(',').map((k) => k.trim()),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="pt-[76px] pb-[78px]" style={{ transformStyle: 'preserve-3d' }}>
        <div data-anim="" className="mb-[28px] flex items-center gap-6">
          <Avatar src={settings.avatarUrl} alt={settings.avatarAlt} />
          <h1 className="m-0 text-[25px] leading-[1.34] font-semibold tracking-[-0.025em]">
            {settings.heroHeadline}
          </h1>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-[minmax(0,1fr)_200px]">
          <div>
            {settings.heroParagraphs.map((paragraph, index) => (
              <p
                key={index}
                data-anim=""
                className={`text-[17.5px] leading-[1.72] text-text-4 ${
                  index === settings.heroParagraphs.length - 1
                    ? 'mb-[34px] max-w-[62ch]'
                    : 'mb-5'
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div data-anim="" className="flex flex-wrap gap-[18px] font-mono text-[13.5px]">
              <a
                href={`mailto:${settings.email}`}
                className="border-b border-accent-40 pb-0.5 text-accent transition-colors duration-300 hover:border-accent"
              >
                email
              </a>
              {[
                { href: settings.linkedinUrl, label: 'linkedin' },
                { href: settings.githubUrl, label: 'github' },
                { href: settings.resumeUrl, label: 'résumé' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-rule-link pb-0.5 text-text-5 transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {settings.badgeEnabled && (
            <ToptalBadge
              headline={settings.badgeHeadline}
              vettedBy={settings.badgeVettedBy}
              ctaLabel={settings.badgeCtaLabel}
              ctaUrl={settings.badgeCtaUrl}
            />
          )}
        </div>
      </section>

      <section className="pb-[84px]" style={{ transformStyle: 'preserve-3d' }}>
        <div data-anim="" className="mb-2 font-mono text-[12.5px] text-muted">
          {settings.selectedWorkLabel}
        </div>

        <div className="flex flex-col">
          {featured.map((project) => (
            <Link
              key={project.id}
              href="/work"
              data-anim=""
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-5 border-b border-rule py-[19px] transition-[border-color,transform] duration-[400ms] ease-site hover:translate-x-[5px] hover:border-accent-50"
            >
              <span>
                <span className="text-[17px] font-semibold tracking-[-0.015em]">{project.name}</span>
                <span className="text-base text-text-5">{project.listDescription}</span>
              </span>
              <span className="font-mono text-[12.5px] text-muted-2">{project.year}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/work"
          data-anim=""
          className="mt-[22px] inline-block font-mono text-[13px] text-accent transition-transform duration-[400ms] ease-site hover:translate-x-[4px]"
        >
          {settings.selectedWorkCta}
        </Link>
      </section>
    </>
  );
}
