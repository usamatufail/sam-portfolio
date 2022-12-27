import { useState } from 'react';
import { Animated } from '..';
import { aboutData } from './data';
import { Menu } from './components';

export function AboutLayout({ children }: { children: React.ReactNode }) {
  const [menu1, setMenu1] = useState(true);
  return (
    <div className="grid grid-cols-[250px_auto] h-[calc(100vh_-_128px)] overflow-auto">
      {/* Sidebar */}
      <div className="border-r border-r-solid border-r-main-border">
        <Menu
          heading="personal-info"
          items={aboutData}
          open={menu1}
          setOpen={setMenu1}
        />
      </div>
      <div className="overflow-hidden">
        <Animated>{children}</Animated>
      </div>
    </div>
  );
}
