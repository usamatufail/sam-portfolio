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
            className={`text-text-3 m-0 max-w-[62ch] text-[17.5px] leading-[1.72] ${
              index === settings.aboutParagraphs.length - 1 ? '' : 'mb-[18px]'
            }`}
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="pb-[70px]" style={{ transformStyle: 'preserve-3d' }}>
        <div data-anim="" className="text-muted mb-2 font-mono text-[12.5px]">
          {settings.experienceLabel}
        </div>
        {experience.map((row) => (
          <div
            key={row.id}
            data-anim=""
            className="border-rule grid grid-cols-1 gap-x-6 gap-y-1 border-b py-[18px] sm:grid-cols-[116px_minmax(0,1fr)]"
          >
            <div className="text-muted font-mono text-[13px]">{row.period}</div>
            <div>
              <div className="text-[16.5px] font-semibold">{row.role}</div>
              <div className="text-text-5 mt-[3px] text-base">{row.employer}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="pb-[70px]">
        <div data-anim="" className="text-muted mb-4 font-mono text-[12.5px]">
          {settings.principlesLabel}
        </div>
        {principles.map((item, index) => (
          <p
            key={item.id}
            data-anim=""
            className={`text-text-3 m-0 max-w-[64ch] text-[17px] leading-[1.78] ${
              index === principles.length - 1 ? '' : 'mb-[14px]'
            }`}
          >
            <span className="text-text font-semibold">{item.lead}</span> {item.body}
          </p>
        ))}
      </section>

      <section className="pb-[84px]">
        <div data-anim="" className="text-muted mb-4 font-mono text-[12.5px]">
          {settings.educationLabel}
        </div>
        <p data-anim="" className="text-text-5 m-0 font-mono text-[13.5px] leading-[2]">
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
