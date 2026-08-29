import type { Metadata } from 'next';
import { Editable } from '@/components/edit/Editable';
import { editPath } from '@/lib/inline/fields';
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
        <Editable
          as="h1"
          reveal
          path={editPath('settings', 1, 'aboutTitle')}
          value={settings.aboutTitle}
          className="m-0 mb-[22px] block text-[27px] font-semibold tracking-[-0.025em]"
        />
        {settings.aboutParagraphs.map((paragraph, index) => (
          <Editable
            key={index}
            as="p"
            reveal
            multiline
            path={editPath('settings', 1, 'aboutParagraphs', index)}
            value={paragraph}
            className={`text-text-3 m-0 max-w-[62ch] text-[17.5px] leading-[1.72] ${
              index === settings.aboutParagraphs.length - 1 ? '' : 'mb-[18px]'
            }`}
          />
        ))}
      </section>

      <section className="pb-[70px]" style={{ transformStyle: 'preserve-3d' }}>
        <Editable
          reveal
          path={editPath('settings', 1, 'experienceLabel')}
          value={settings.experienceLabel}
          className="text-muted mb-2 block font-mono text-[12.5px]"
        />
        {experience.map((row) => (
          <div
            key={row.id}
            data-anim=""
            className="border-rule grid grid-cols-1 gap-x-6 gap-y-1 border-b py-[18px] sm:grid-cols-[116px_minmax(0,1fr)]"
          >
            <Editable
              path={editPath('experience', row.id, 'period')}
              value={row.period}
              className="text-muted font-mono text-[13px]"
            />
            <div>
              <Editable
                path={editPath('experience', row.id, 'role')}
                value={row.role}
                className="block text-[16.5px] font-semibold"
              />
              <Editable
                path={editPath('experience', row.id, 'employer')}
                value={row.employer}
                className="text-text-5 mt-[3px] block text-base"
              />
            </div>
          </div>
        ))}
      </section>

      <section className="pb-[70px]">
        <Editable
          reveal
          path={editPath('settings', 1, 'principlesLabel')}
          value={settings.principlesLabel}
          className="text-muted mb-4 block font-mono text-[12.5px]"
        />
        {principles.map((item, index) => (
          <p
            key={item.id}
            data-anim=""
            className={`text-text-3 m-0 max-w-[64ch] text-[17px] leading-[1.78] ${
              index === principles.length - 1 ? '' : 'mb-[14px]'
            }`}
          >
            <Editable
              path={editPath('principles', item.id, 'lead')}
              value={item.lead}
              className="text-text font-semibold"
            />{' '}
            <Editable multiline path={editPath('principles', item.id, 'body')} value={item.body} />
          </p>
        ))}
      </section>

      <section className="pb-[84px]">
        <Editable
          reveal
          path={editPath('settings', 1, 'educationLabel')}
          value={settings.educationLabel}
          className="text-muted mb-4 block font-mono text-[12.5px]"
        />
        <p data-anim="" className="text-text-5 m-0 font-mono text-[13.5px] leading-[2]">
          {education.map((row, index) => (
            <span key={row.id}>
              <Editable path={editPath('education', row.id, 'line')} value={row.line} />
              {index === education.length - 1 ? null : <br />}
            </span>
          ))}
        </p>
      </section>
    </>
  );
}
