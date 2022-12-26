import Image from 'next/image';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import styles from './project-card.module.scss';

interface ProjectCardProps {
  name: string;
  description: string;
  src: string;
  site?: string;
  technologies: string[];
  repository?: string;
  key: string;
}

export const ProjectCard = ({
  name,
  description,
  technologies,
  repository,
  site,
  src,
}: ProjectCardProps) => {
  return (
    <div className={styles['card-project']}>
      <div className={`${styles['img-container']}`}>
        <Image
          src={src}
          fill
          alt="Project Representation"
          className={styles['img-project']}
        />
      </div>
      <div className="p-[20px]">
        <h2 className={styles['title-project']}>{name}</h2>
        <p className="mb-[10px]">{description}</p>
        <div className={styles['technologies-container']}>
          {technologies.map((tech, i) => (
            <span key={i} className={styles['span-technologies']}>
              {tech}
            </span>
          ))}
        </div>
        <div className={styles['links-container']}>
          {repository ? (
            <a
              href={repository}
              title="Repository"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub />
            </a>
          ) : null}
          {site ? (
            <a
              href={site}
              title="View Project"
              target="_blank"
              rel="noreferrer"
            >
              <FiExternalLink />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};
