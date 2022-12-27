import { useState } from 'react';
import { Animated } from '..';
import { Menu } from './components';
import { contactData } from './data/contact.data';

export function ContactLayout({ children }: { children: React.ReactNode }) {
  const [menu1, setMenu1] = useState(true);
  const [menu2, setMenu2] = useState(true);
  return (
    <div className="grid grid-cols-[300px_auto] h-[calc(100vh_-_128px)] overflow-auto">
      {/* Sidebar */}
      <div className="border-r border-r-solid border-r-main-border">
        <Menu
          open={menu1}
          setOpen={setMenu1}
          heading="contacts"
          items={contactData.items1}
        />
        <Menu
          open={menu2}
          setOpen={setMenu2}
          heading="find-me-also-in"
          items={contactData.items2}
        />
      </div>
      <div className="overflow-hidden">
        <Animated>{children}</Animated>
      </div>
    </div>
  );
}
