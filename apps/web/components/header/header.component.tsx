import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Hamburger from 'hamburger-react';
import { useState } from 'react';

interface LinkProps {
  href: string;
  text: string;
}

const Link = ({ href, text }: LinkProps) => {
  const pathname = useRouter().pathname;
  const isActive = href === '/' ? pathname === href : pathname.includes(href);

  return (
    <NextLink href={href === '/about' ? '/about/about-me' : href}>
      <div
        className="md:border-r-solid border-b-solid md:first:border-l-solid hover:border-b-solid static z-10 cursor-pointer border border-b-[3px] border-solid border-main-border border-b-[transparent] px-[12px] py-[18px] transition-all hover:border-b-[3px] hover:border-b-[#fea55f] md:sticky md:border-r md:border-r-main-border md:px-[40px] md:first:border-l md:first:border-l-main-border"
        style={isActive ? { borderBottom: '3px solid #fea55f' } : {}}
      >
        {text}
      </div>
    </NextLink>
  );
};

const MobileHeader = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="border-b-solid flex items-center justify-between border-b border-b-main-border md:hidden">
      <NextLink href="/">
        <div className="w-[250px] cursor-pointer px-[22px] py-[18px]">
          sam-tufail
        </div>
      </NextLink>
      <div className="relative px-[22px]">
        <Hamburger toggled={isOpen} toggle={setOpen} />
        {isOpen ? (
          <div className="border-b-solid absolute left-[-135px] z-20 w-[200px] border-b border-b-main-border bg-[#011627] md:bg-transparent">
            <Link text="_hello" href="/" />
            <Link text="_about" href="/about" />
            <Link text="_projects" href="/projects" />
            <Link text="_contact-me" href="/contact" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const DesktopHeader = () => {
  return (
    <div className="border-b-solid hidden items-center justify-between border-b border-b-main-border md:flex">
      <div className="flex items-center justify-between">
        <NextLink href="/">
          <div className="w-[250px] cursor-pointer px-[22px] py-[18px]">
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

export const Header = () => {
  return (
    <div>
      <DesktopHeader />
      <MobileHeader />
    </div>
  );
};
