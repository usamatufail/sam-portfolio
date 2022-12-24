import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { DiDatabase, DiGit, DiJsBadge, DiReact } from 'react-icons/di';
import { useRouter } from 'next/router';

interface MenuItemProps {
  href: string;
  text: string;
  icon: ReactNode;
}

const MenuItem = ({ href, text, icon }: MenuItemProps) => {
  const pathname = useRouter().pathname;
  const isActive =
    href === '/about' ? pathname === href : pathname.includes(href);
  return (
    <Link href={href}>
      <div className="flex gap-[10px] items-center pl-[35px] py-[5px] cursor-pointer">
        {icon}
        <span
          className={`hover:text-white transition-all ${
            isActive ? 'text-white' : ''
          }`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

interface MenuHeadingProps {
  text?: string;
  onClick?: () => void;
  open?: boolean;
}
const MenuHeading = ({
  text = 'personal-info',
  onClick = () => {},
  open,
}: MenuHeadingProps) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-[10px] items-center py-[10px] px-[20px] borer-b-solid border-b-main-border border-b cursor-pointer select-none"
    >
      {open ? (
        <svg
          width="9"
          height="7"
          viewBox="0 0 9 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.74998 6.65186L0.499969 0.651856L9 0.651855L4.74998 6.65186Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="7"
          height="9"
          viewBox="0 0 7 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.49634 4.51173L0.496338 8.76175L0.496338 0.261719L6.49634 4.51173Z"
            fill="white"
          />
        </svg>
      )}
      <span className="text-white">{text}</span>
    </div>
  );
};

export function AboutLayout({ children }: { children: React.ReactNode }) {
  const [menu1, setMenu1] = useState(true);
  return (
    <div className="grid grid-cols-[235px_auto] h-[calc(100vh_-_128px)] overflow-auto">
      {/* Sidebar */}
      <div className="border-r border-r-solid border-r-main-border">
        {/* Sidebar Heading 1 */}
        <MenuHeading
          text="personal-info"
          onClick={() => setMenu1(prev => !prev)}
          open={menu1}
        />
        {/* Sidebar Menu 1 */}
        {menu1 && (
          <div className="flex flex-col border-r-solid borer-b-solid border-b-main-border border-b py-[10px]">
            <MenuItem
              href="/about"
              text="about-sam.jsx"
              icon={<DiReact color="#61DBFB" />}
            />
            <MenuItem
              href="/about/experience"
              text="experience.sql"
              icon={<DiDatabase color="#DB7533" />}
            />
            {/*<MenuItem
              href="/about/education"
              text="education.js"
              icon={<DiJsBadge color="#E4D04B" />}
            />
            <MenuItem
              href="/about/hobbies"
              text="hobbies.git"
              icon={<DiGit color="#E44C30" />}
            /> */}
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
