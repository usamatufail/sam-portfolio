import { RootLayout, AboutLayout, Timeline, Animated } from 'components';
import { education } from 'mocks';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CardProps {
  title: string;
  image: string;
  organization: string;
  description: string;
  duration: string;
}

const Card = ({
  title,
  image,
  organization,
  description,
  duration,
}: CardProps) => {
  return (
    <div
      className="rounded-[8px] w-[510px] overflow-auto"
      style={{
        background:
          'linear-gradient(150.26deg, rgba(23, 85, 83, 0.7) 1.7%, rgba(67, 217, 173, 0.091) 81.82%)',
        border: '1px solid #0c1616',
        boxShadow: 'inset 0px 2px 0px rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(32px)',
      }}
    >
      <div className="px-[20px] py-[20px]">
        <h1 className="text-white text-[28px] text-center mb-[20px]">
          {title}
        </h1>
        <div className="flex items-center gap-[10px] mb-[20px]">
          <div>
            <Image src={image} alt={title} width={60} height={60} />
          </div>
          <div>
            <h2 className="text-white">{organization}</h2>
            <h3 className="text-white">{duration}</h3>
          </div>
        </div>
        <p className="text-[#fafafa] whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
};

export default function EducationPage() {
  const [activeKey, setActiveKey] = useState(education[0].activeKey);
  const [active, setActive] = useState(education[0]);

  useEffect(() => {
    const active = education.find(data => data.activeKey === activeKey) || {
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
              data={education}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
            />
          </div>
          <div>
            <Animated
              activeKey={activeKey}
              className="flex items-center justify-center h-[calc(100vh_-_128px)] overflow-auto"
            >
              <Card {...active} />
            </Animated>
          </div>
        </div>
      </AboutLayout>
    </RootLayout>
  );
}
