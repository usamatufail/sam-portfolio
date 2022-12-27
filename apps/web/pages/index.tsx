import { Code, RootLayout } from 'components';
import { homepage } from 'mocks';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <RootLayout>
      <div className="min-h-[calc(100vh_-_128px)] grid grid-cols-2 gap-[130px]">
        {/* Intro */}
        <div className="flex items-center justify-end">
          <div>
            <p className="text-[#E5E9F0] text-[18px]">Hi all, I am</p>
            <h1 className="text-[#E5E9F0] text-[62px]">{homepage.name}</h1>
            <h2 className="text-[#4D5BCE] text-[32px] mb-[80px]">
              {'>'} {homepage.profession}
            </h2>
            <p>{'//'} This project is built using TurboRepo (Monorepo)</p>
            <p>{'//'} you can also see this project on my Github profile</p>
            <div>
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
        <div className="flex items-center justify-start">
          <div
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
            className="rounded-[8px] h-[550px] w-[510px]"
            style={{
              background:
                'linear-gradient(150.26deg, rgba(23, 85, 83, 0.7) 1.7%, rgba(67, 217, 173, 0.091) 81.82%)',
              border: '1px solid #0c1616',
              boxShadow: 'inset 0px 2px 0px rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(32px)',
              zIndex: 8,
              position: 'absolute',
            }}
          >
            <div className="w-full h-full flex items-center">
              <Code code={homepage.code} />
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
