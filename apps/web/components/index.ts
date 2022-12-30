import dynamic from 'next/dynamic';
import { Code as CodeImp } from './code/code.component';

export { Footer } from './footer/footer.component';
export { Header } from './header/header.component';
export { Timeline } from './timeline/timeline.component';
export { Animated } from './animated/animated.component';
export { ProjectCard } from './project-card/project-card.component';
export { Input } from './input/input.component';
export * from './layout';

export const Code = dynamic(
  () => import('./code/code.component').then(module => module.Code) as any,
  { ssr: false },
) as typeof CodeImp;
