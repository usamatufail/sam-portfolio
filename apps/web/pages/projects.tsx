import { ProjectCard, RootLayout } from 'components';
import { projects } from 'mocks';

export default function Projects() {
  return (
    <RootLayout>
      <div className="h-[calc(100vh_-_128px)] overflow-auto ">
        <div className="flex flex-col gap-[5px] mt-[80px]">
          <h1 className="text-[40px] text-center">Projects</h1>
          <p className="text-[16px] text-center ">
            Shining a light on my hard work and accomplishments
          </p>
        </div>
        <div className="flex flex-wrap gap-[32px] justify-center mt-[40px] px-[80px] pb-[80px]">
          {projects.map(project => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
}
