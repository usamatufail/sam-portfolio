'use client';

import NextLink from 'next/link';
import styles from './header.module.scss';
import { usePathname } from 'next/navigation';

interface LinkProps {
  href: string;
  text: string;
}

const Link = ({ href, text }: LinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <NextLink href={href}>
      <div
        className={`px-[40px] py-[18px] ${styles['header-element']} ${
          isActive ? styles['header-element-active'] : ''
        }`}
      >
        {text}
      </div>
    </NextLink>
  );
};

export const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-b-solid border-b-main-border">
      <div className="flex items-center justify-between">
        <NextLink href="/">
          <div className="px-[22px] py-[18px] w-[300px] cursor-pointer">
            sam-tufail
          </div>
        </NextLink>
        <div className="flex items-center justify-between">
          <Link text="_hello" href="/" />
          <Link text="_about" href="/about" />
          <Link text="_projects" href="/projects" />
        </div>
      </div>
      <div>
        <Link text="_contact-me" href="/contact" />
      </div>
    </div>
  );
};
