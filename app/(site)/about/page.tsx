import type { Metadata } from 'next';
import { getEducation, getExperience, getPrinciples, getSettings } from '@/lib/queries';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const description = settings.aboutParagraphs[0] ?? settings.seoDescription;
  return {
    title: settings.aboutTitle,
    description,
    alternates: { canonical: '/about' },
    openGraph: { title: `${settings.aboutTitle} · ${settings.fullName}`, description },
  };
}

export default async function AboutPage() {
  const [settings, experience, principles, education] = await Promise.all([
    getSettings(),
    getExperience(),
    getPrinciples(),
    getEducation(),
  ]);

  return (
    <>
      <section className="pt-[76px] pb-[70px]">
        <h1 data-anim="" className="m-0 mb-[22px] text-[27px] font-semibold tracking-[-0.025em]">
          {settings.aboutTitle}
        </h1>
        {settings.aboutParagraphs.map((paragraph, index) => (
          <p
            key={index}
            data-anim=""
            className={`m-0 max-w-[62ch] text-[17.5px] leading-[1.72] text-text-3 ${
              index === settings.aboutParagraphs.length - 1 ? '' : 'mb-[18px]'
            }`}
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="pb-[70px]" style={{ transformStyle: 'preserve-3d' }}>
        <div data-anim="" className="mb-2 font-mono text-[12.5px] text-muted">
          {settings.experienceLabel}
        </div>
        {experience.map((row) => (
          <div
            key={row.id}
            data-anim=""
            className="grid grid-cols-[116px_minmax(0,1fr)] gap-x-6 gap-y-1 border-b border-rule py-[18px]"
          >
            <div className="font-mono text-[13px] text-muted">{row.period}</div>
            <div>
              <div className="text-[16.5px] font-semibold">{row.role}</div>
              <div className="mt-[3px] text-base text-text-5">{row.employer}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="pb-[70px]">
        <div data-anim="" className="mb-4 font-mono text-[12.5px] text-muted">
          {settings.principlesLabel}
        </div>
        {principles.map((item, index) => (
          <p
            key={item.id}
            data-anim=""
            className={`m-0 max-w-[64ch] text-[17px] leading-[1.78] text-text-3 ${
              index === principles.length - 1 ? '' : 'mb-[14px]'
            }`}
          >
            <span className="font-semibold text-text">{item.lead}</span> {item.body}
          </p>
        ))}
      </section>

      <section className="pb-[84px]">
        <div data-anim="" className="mb-4 font-mono text-[12.5px] text-muted">
          {settings.educationLabel}
        </div>
        <p data-anim="" className="m-0 font-mono text-[13.5px] leading-[2] text-text-5">
          {education.map((row, index) => (
            <span key={row.id}>
              {row.line}
              {index === education.length - 1 ? null : <br />}
            </span>
          ))}
        </p>
      </section>
    </>
  );
}
