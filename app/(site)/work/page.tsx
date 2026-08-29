import type { Metadata } from 'next';
import { Editable } from '@/components/edit/Editable';
import { editPath } from '@/lib/inline/fields';
import { getProjects, getSettings } from '@/lib/queries';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.workTitle,
    description: settings.workIntro,
    alternates: { canonical: '/work' },
    openGraph: {
      title: `${settings.workTitle} · ${settings.fullName}`,
      description: settings.workIntro,
    },
  };
}

export default async function WorkPage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);

  return (
    <>
      <section className="pt-[76px] pb-[26px]">
        <Editable
          as="h1"
          reveal
          path={editPath('settings', 1, 'workTitle')}
          value={settings.workTitle}
          className="m-0 mb-[18px] block text-[27px] font-semibold tracking-[-0.025em]"
        />
        <Editable
          as="p"
          multiline
          path={editPath('settings', 1, 'workIntro')}
          value={settings.workIntro}
          className="text-text-4 m-0 max-w-[62ch] text-[17.5px] leading-[1.72]"
        />
      </section>

      <section className="pb-[84px]" style={{ transformStyle: 'preserve-3d' }}>
        {projects.map((project, index) => (
          <article
            key={project.id}
            data-anim=""
            className={`border-rule border-t py-[42px] ${
              index === projects.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className="text-muted mb-[14px] flex items-baseline gap-[14px] font-mono text-[12.5px]">
              <Editable path={editPath('projects', project.id, 'year')} value={project.year} />
              <Editable
                path={editPath('projects', project.id, 'category')}
                value={project.category}
              />
            </div>

            <Editable
              as="h2"
              multiline
              path={editPath('projects', project.id, 'caseTitle')}
              value={project.caseTitle}
              className="m-0 mb-[14px] block text-[21px] font-semibold tracking-[-0.02em]"
            />

            {project.body.map((paragraph, i) => (
              <Editable
                key={i}
                as="p"
                multiline
                path={editPath('projects', project.id, 'body', i)}
                value={paragraph}
                className={`text-text-3 m-0 max-w-[64ch] text-[17px] leading-[1.72] ${
                  i === project.body.length - 1 ? 'mb-5' : 'mb-[14px]'
                }`}
              />
            ))}

            <div className="text-tech flex flex-wrap gap-x-[18px] gap-y-1.5 font-mono text-[12.5px]">
              {project.tech.map((item, i) => (
                <Editable key={i} path={editPath('projects', project.id, 'tech', i)} value={item} />
              ))}
              {project.linkUrl && (
                <a
                  href={project.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent -my-2 inline-block py-2"
                >
                  <Editable
                    path={editPath('projects', project.id, 'linkLabel')}
                    value={project.linkLabel ?? project.linkUrl}
                  />
                </a>
              )}
            </div>
          </article>
        ))}

        <Editable
          as="p"
          multiline
          reveal
          path={editPath('settings', 1, 'alsoShipped')}
          value={settings.alsoShipped}
          className="text-muted mt-[30px] mb-0 block font-mono text-[12.5px] leading-[1.9]"
        />
      </section>
    </>
  );
}
