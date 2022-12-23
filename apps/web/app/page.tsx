import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="min-h-[calc(100vh_-_128px)] grid grid-cols-2 gap-[130px]">
      {/* Intro */}
      <div className="flex items-center justify-end">
        <div>
          <p className="text-[#E5E9F0] text-[18px]">Hi all, I am</p>
          <h1 className="text-[#E5E9F0] text-[62px]">Sam Tufail</h1>
          <h2 className="text-[#4D5BCE] text-[32px] mb-[80px]">
            {'>'} Full Stack developer
          </h2>
          <p>{'//'} This project is built using TurboRepo (Monorepo)</p>
          <p>{'//'} you can also see this project on my Github profile</p>
          <p>
            <span className="text-[#4D5BCE]">const</span>{' '}
            <span className="text-[#43D9AD]">githubLink</span>{' '}
            <span className="text-white">=</span>{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/usamatufail"
            >
              <span className="text-[#e99287]">
                https://github.com/usamatufail
              </span>
            </a>
          </p>
        </div>
      </div>
      {/* Board */}
      <div className="flex items-center justify-start sticky">
        <div className="absolute w-[100vh] -left-[250px] -top-[50px]">
          <img src="/home-bg.svg" alt="home-bg" />
        </div>
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
            <img src="/code.png" alt="code-sample" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
