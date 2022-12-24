import { RootLayout, AboutLayout, Timeline } from 'components';
import { experience } from 'mocks';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [activeKey, setActiveKey] = useState(experience[0].activeKey);
  const [active, setActive] = useState(experience[0]);

  useEffect(() => {
    const active = experience.find(data => data.activeKey === activeKey) || {
      title: '',
      description: '',
      organization: '',
      image: '',
      activeKey: 0,
      duration: '',
    };
    setActive(active);
  }, [activeKey]);
  return (
    <RootLayout>
      <AboutLayout>
        <div className="grid grid-cols-[auto_1fr] h-[calc(100vh_-_128px)]">
          <div className="px-[80px] pt-[5px] border-r border-r-solid border-r-main-border overflow-auto">
            <Timeline
              data={experience}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
            />
          </div>
          <div className="flex items-center justify-center relative overflow-auto">
            <div
              style={{
                background: '#43D9AD',
                opacity: '0.2',
                filter: 'blur(87px)',
                transform: 'rotate(-94.3deg)',
                width: '454px',
                height: '492px',
              }}
            />
            <div
              className="rounded-[8px] w-[510px]"
              style={{
                background:
                  'linear-gradient(150.26deg, rgba(23, 85, 83, 0.7) 1.7%, rgba(67, 217, 173, 0.091) 81.82%)',
                border: '1px solid #0c1616',
                boxShadow: 'inset 0px 2px 0px rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(32px)',
                position: 'absolute',
                zIndex: 8,
              }}
            >
              <div className="px-[20px] py-[20px]">
                <h1 className="text-white text-[28px] text-center mb-[20px]">
                  {active?.title}
                </h1>
                <div className="flex items-center gap-[10px] mb-[20px]">
                  <div>
                    <Image
                      src={active?.image}
                      alt={active?.title}
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    <h2 className="text-white">{active?.organization}</h2>
                    <h3 className="text-white">{active?.duration}</h3>
                  </div>
                </div>
                <p className="text-[#fafafa] whitespace-pre-wrap">
                  {active?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AboutLayout>
    </RootLayout>
  );
}
