import type { Metadata } from 'next';
import { getProjects, getSettings } from '@/lib/queries';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.workTitle,
    description: settings.workIntro,
    alternates: { canonical: '/work' },
    openGraph: { title: `${settings.workTitle} · ${settings.fullName}`, description: settings.workIntro },
  };
}

export default async function WorkPage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);

  return (
    <>
      <section className="pt-[76px] pb-[26px]">
        <h1 data-anim="" className="m-0 mb-[18px] text-[27px] font-semibold tracking-[-0.025em]">
          {settings.workTitle}
        </h1>
        <p data-anim="" className="m-0 max-w-[62ch] text-[17.5px] leading-[1.72] text-text-4">
          {settings.workIntro}
        </p>
      </section>

      <section className="pb-[84px]" style={{ transformStyle: 'preserve-3d' }}>
        {projects.map((project, index) => (
          <article
            key={project.id}
            data-anim=""
            className={`border-t border-rule py-[42px] ${
              index === projects.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className="mb-[14px] flex items-baseline gap-[14px] font-mono text-[12.5px] text-muted">
              <span>{project.year}</span>
              <span>{project.category}</span>
            </div>

            <h2 className="m-0 mb-[14px] text-[21px] font-semibold tracking-[-0.02em]">
              {project.caseTitle}
            </h2>

            {project.body.map((paragraph, i) => (
              <p
                key={i}
                className={`m-0 max-w-[64ch] text-[17px] leading-[1.72] text-text-3 ${
                  i === project.body.length - 1 ? 'mb-5' : 'mb-[14px]'
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-x-[18px] gap-y-1.5 font-mono text-[12.5px] text-tech">
              {project.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
              {project.linkUrl && (
                <a href={project.linkUrl} target="_blank" rel="noreferrer" className="text-accent">
                  {project.linkLabel ?? project.linkUrl}
                </a>
              )}
            </div>
          </article>
        ))}

        <p
          data-anim=""
          className="mt-[30px] mb-0 font-mono text-[12.5px] leading-[1.9] text-muted"
        >
          {settings.alsoShipped}
        </p>
      </section>
    </>
  );
}
