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
        <div
          data-anim=""
          className="mb-[28px] flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6"
        >
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
                className={`text-text-4 text-[17.5px] leading-[1.72] ${
                  index === settings.heroParagraphs.length - 1 ? 'mb-[34px] max-w-[62ch]' : 'mb-5'
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div data-anim="" className="flex flex-wrap gap-[18px] font-mono text-[13.5px]">
              <a
                href={`mailto:${settings.email}`}
                className="border-accent-40 text-accent hover:border-accent -mt-3 border-b pt-3 pb-0.5 transition-colors duration-300"
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
                  className="border-rule-link text-text-5 hover:border-accent hover:text-accent -mt-3 border-b pt-3 pb-0.5 transition-colors duration-300"
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
        <div data-anim="" className="text-muted mb-2 font-mono text-[12.5px]">
          {settings.selectedWorkLabel}
        </div>

        <div className="flex flex-col">
          {featured.map((project) => (
            <Link
              key={project.id}
              href="/work"
              data-anim=""
              className="border-rule ease-site hover:border-accent-50 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-5 border-b py-[19px] transition-[border-color,transform] duration-[400ms] hover:translate-x-[5px]"
            >
              <span>
                <span className="text-[17px] font-semibold tracking-[-0.015em]">
                  {project.name}
                </span>
                <span className="text-text-5 text-base">{project.listDescription}</span>
              </span>
              <span className="text-muted-2 font-mono text-[12.5px]">{project.year}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/work"
          data-anim=""
          className="text-accent ease-site mt-[30px] -mb-2 inline-block py-2 font-mono text-[13px] transition-transform duration-[400ms] hover:translate-x-[4px]"
        >
          {settings.selectedWorkCta}
        </Link>
      </section>
    </>
  );
}
