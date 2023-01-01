import { Code, RootLayout } from 'components';
import { homepage } from 'mocks';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <RootLayout>
      <div className="grid min-h-[calc(100vh_-_130px)] grid-cols-1 gap-[60px] md:grid-cols-2 md:gap-[130px]">
        {/* Intro */}
        <div className="mt-[25px] flex items-center justify-end px-[20px] md:mt-[25px] md:px-[20px]">
          <div className="max-w-[600px]">
            <p className="text-[18px] text-[#E5E9F0]">Hi all, I am</p>
            <h1 className="text-[32px] text-[#E5E9F0] md:text-[62px]">
              {homepage.name}
            </h1>
            <h2 className="mb-[20px] text-[26px] text-[#4D5BCE] md:mb-[80px] md:text-[32px]">
              {'>'} {homepage.profession}
            </h2>
            <p className="text-[12px] md:text-[16px]">
              {'//'} This project is built using TurboRepo (Monorepo),{' '}
              <br className="hidden md:inline" /> Next.js 13, React.js, and
              Tailwind CSS
            </p>
            <p className="text-[12px] md:text-[16px]">
              {'//'} you can also see this project on my Github profile
            </p>
            <div className="text-[12px] md:text-[16px]">
              <span className="text-[#4D5BCE]">const</span>{' '}
              <span className="text-[#43D9AD]">githubLink</span>{' '}
              <span className="text-white">=</span>{' '}
              <a target="_blank" rel="noreferrer" href={homepage.githubLink}>
                <span className="text-[#e99287]">{homepage.githubLink}</span>
              </a>
            </div>
          </div>
        </div>
        {/* Board */}
        <div className="mb-[20px] flex items-center justify-start px-[22px] md:mb-[0px] md:px-[0px]">
          <div
            className="hidden md:block"
            style={{
              background: '#43D9AD',
              opacity: '0.4',
              filter: 'blur(87px)',
              transform: 'rotate(-94.3deg)',
              width: '454px',
              height: '492px',
            }}
          />
          <div
            className="hidden md:block"
            style={{
              background: '#4D5BCE',
              opacity: '0.4',
              filter: 'blur(87px)',
              transform: 'rotate(13.51deg)',
              width: '200px',
              height: '492px',
            }}
          />
          <div
            className="static h-[550px] w-[100%] rounded-[8px] md:absolute md:w-[510px]"
            style={{
              background:
                'linear-gradient(150.26deg, rgba(23, 85, 83, 0.7) 1.7%, rgba(67, 217, 173, 0.091) 81.82%)',
              border: '1px solid #0c1616',
              boxShadow: 'inset 0px 2px 0px rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(32px)',
              zIndex: 8,
            }}
          >
            <div className="flex h-full w-full items-center">
              <Code code={homepage.code} />
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
